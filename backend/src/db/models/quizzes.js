const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const quizzes = sequelize.define(
    'quizzes',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      difficulty: {
        type: DataTypes.ENUM,

        values: ['easy', 'medium', 'hard'],
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  quizzes.associate = (db) => {
    db.quizzes.belongsToMany(db.questions, {
      as: 'questions',
      foreignKey: {
        name: 'quizzes_questionsId',
      },
      constraints: false,
      through: 'quizzesQuestionsQuestions',
    });

    db.quizzes.belongsToMany(db.users, {
      as: 'participants',
      foreignKey: {
        name: 'quizzes_participantsId',
      },
      constraints: false,
      through: 'quizzesParticipantsUsers',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.quizzes.hasMany(db.questions, {
      as: 'questions_quiz',
      foreignKey: {
        name: 'quizId',
      },
      constraints: false,
    });

    //end loop

    db.quizzes.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.quizzes.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.quizzes.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return quizzes;
};
