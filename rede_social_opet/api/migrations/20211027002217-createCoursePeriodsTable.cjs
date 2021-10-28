module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('course_periods', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      period: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      courseId: {
        type: Sequelize.INTEGER,
        field: 'course_id',
        references: {
          model: 'courses',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    }, {
      uniqueKeys: {
        actions_unique: {
          fields: ['period', 'course_id'],
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('course_periods');
  },
};
