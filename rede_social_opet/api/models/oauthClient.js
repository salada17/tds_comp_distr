import sequelize from 'sequelize';
import { db } from '../db.js';

const { DataTypes, Model } = sequelize;

class OAuthClient extends Model {}

OAuthClient.init({
  clientId: {
    type: DataTypes.TEXT,
    field: 'client_id',
    allowNull: false
  },
  clientSecret: {
    type: DataTypes.TEXT,
    field: 'client_secret',
    allowNull: false
  },
  redirectUri: {
    type: DataTypes.TEXT,
    field: 'redirect_uri',
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'OAuthClient',
  tableName: 'oauth_clients',
  timestamps: false
});

export { OAuthClient };
