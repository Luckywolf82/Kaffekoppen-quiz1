const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class QuizzesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const quizzes = await db.quizzes.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        description: data.description || null,
        difficulty: data.difficulty || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await quizzes.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    await quizzes.setQuestions(data.questions || [], {
      transaction,
    });

    await quizzes.setParticipants(data.participants || [], {
      transaction,
    });

    return quizzes;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const quizzesData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      description: item.description || null,
      difficulty: item.difficulty || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const quizzes = await db.quizzes.bulkCreate(quizzesData, { transaction });

    // For each item created, replace relation files

    return quizzes;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const quizzes = await db.quizzes.findByPk(id, {}, { transaction });

    await quizzes.update(
      {
        title: data.title || null,
        description: data.description || null,
        difficulty: data.difficulty || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await quizzes.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    await quizzes.setQuestions(data.questions || [], {
      transaction,
    });

    await quizzes.setParticipants(data.participants || [], {
      transaction,
    });

    return quizzes;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const quizzes = await db.quizzes.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of quizzes) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of quizzes) {
        await record.destroy({ transaction });
      }
    });

    return quizzes;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const quizzes = await db.quizzes.findByPk(id, options);

    await quizzes.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await quizzes.destroy({
      transaction,
    });

    return quizzes;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const quizzes = await db.quizzes.findOne({ where }, { transaction });

    if (!quizzes) {
      return quizzes;
    }

    const output = quizzes.get({ plain: true });

    output.questions_quiz = await quizzes.getQuestions_quiz({
      transaction,
    });

    output.questions = await quizzes.getQuestions({
      transaction,
    });

    output.participants = await quizzes.getParticipants({
      transaction,
    });

    output.organization = await quizzes.getOrganization({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.organizations,
        as: 'organization',
      },

      {
        model: db.questions,
        as: 'questions',
        through: filter.questions
          ? {
              where: {
                [Op.or]: filter.questions.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.questions ? true : null,
      },

      {
        model: db.users,
        as: 'participants',
        through: filter.participants
          ? {
              where: {
                [Op.or]: filter.participants.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.participants ? true : null,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('quizzes', 'title', filter.title),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('quizzes', 'description', filter.description),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.difficulty) {
        where = {
          ...where,
          difficulty: filter.difficulty,
        };
      }

      if (filter.organization) {
        var listItems = filter.organization.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.quizzes.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.quizzes.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('quizzes', 'title', query),
        ],
      };
    }

    const records = await db.quizzes.findAll({
      attributes: ['id', 'title'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }
};
