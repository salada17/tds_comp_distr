module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('oauth_tokens', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      accessToken: {
        type: Sequelize.TEXT,
        field: 'access_token',
        allowNull: false
      },
      accessTokenExpiresOn: {
        type: Sequelize.DATE,
        field: 'access_token_expires_on',
        allowNull: false
      },
      clientId: {
        type: Sequelize.TEXT,
        field: 'client_id',
        allowNull: false
      },
      refreshToken: {
        type: Sequelize.TEXT,
        field: 'refresh_token',
        allowNull: false
      },
      refreshTokenExpiresOn: {
        type: Sequelize.DATE,
        field: 'refresh_token_expires_on',
        allowNull: false
      },
      studentId: {
        type: Sequelize.BIGINT,
        field: 'student_id',
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oauth_tokens');
  }
};
