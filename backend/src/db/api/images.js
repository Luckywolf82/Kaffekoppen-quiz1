const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ImagesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const images = await db.images.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await images.setUploaded_by(data.uploaded_by || null, {
      transaction,
    });

    await images.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.images.getTableName(),
        belongsToColumn: 'file',
        belongsToId: images.id,
      },
      data.file,
      options,
    );

    return images;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const imagesData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const images = await db.images.bulkCreate(imagesData, { transaction });

    // For each item created, replace relation files

    for (let i = 0; i < images.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.images.getTableName(),
          belongsToColumn: 'file',
          belongsToId: images[i].id,
        },
        data[i].file,
        options,
      );
    }

    return images;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const images = await db.images.findByPk(id, {}, { transaction });

    await images.update(
      {
        title: data.title || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await images.setUploaded_by(data.uploaded_by || null, {
      transaction,
    });

    await images.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.images.getTableName(),
        belongsToColumn: 'file',
        belongsToId: images.id,
      },
      data.file,
      options,
    );

    return images;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const images = await db.images.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of images) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of images) {
        await record.destroy({ transaction });
      }
    });

    return images;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const images = await db.images.findByPk(id, options);

    await images.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await images.destroy({
      transaction,
    });

    return images;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const images = await db.images.findOne({ where }, { transaction });

    if (!images) {
      return images;
    }

    const output = images.get({ plain: true });

    output.file = await images.getFile({
      transaction,
    });

    output.uploaded_by = await images.getUploaded_by({
      transaction,
    });

    output.organization = await images.getOrganization({
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
        model: db.users,
        as: 'uploaded_by',
      },

      {
        model: db.organizations,
        as: 'organization',
      },

      {
        model: db.file,
        as: 'file',
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
          [Op.and]: Utils.ilike('images', 'title', filter.title),
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

      if (filter.uploaded_by) {
        var listItems = filter.uploaded_by.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          uploaded_byId: { [Op.or]: listItems },
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
          count: await db.images.count({
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
      : await db.images.findAndCountAll({
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
          Utils.ilike('images', 'title', query),
        ],
      };
    }

    const records = await db.images.findAll({
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
