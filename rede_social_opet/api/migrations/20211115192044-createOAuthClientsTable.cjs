'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('oauth_clients', {
      clientId: {
        type: Sequelize.TEXT,
        field: 'client_id',
        allowNull: false,
        primaryKey: true
      },
      clientSecret: {
        type: Sequelize.TEXT,
        field: 'client_secret',
        allowNull: false,
        primaryKey: true
      },
      redirectUri: {
        type: Sequelize.TEXT,
        field: 'redirect_uri',
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('oauth_clients');
  }
};
