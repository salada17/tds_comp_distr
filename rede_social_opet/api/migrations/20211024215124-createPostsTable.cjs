'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      content: {
        type: Sequelize.TEXT
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE
      },
      studentId: {
        type: Sequelize.INTEGER,
        field: 'student_id',
        references: {
          model: 'students',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      courseId: {
        type: Sequelize.INTEGER,
        field: 'course_id',
        references: {
          model: 'courses',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts');
  }
};
