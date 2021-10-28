module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students_course_periods', {
      studentId: {
        type: Sequelize.INTEGER,
        field: 'student_id',
        references: {
          model: 'students',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      coursePeriodId: {
        type: Sequelize.INTEGER,
        field: 'course_period_id',
        references: {
          model: 'course_periods',
          key: 'id',
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
    }, {
      uniqueKeys: {
        actions_unique: {
          fields: ['student_id', 'course_period_id'],
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('students_course_periods');
  },
};
