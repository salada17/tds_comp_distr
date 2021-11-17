import sequelize from 'sequelize';
import { db } from '../db.js';

const { DataTypes, Model } = sequelize;

class OAuthToken extends Model {}

OAuthToken.init({
  accessToken: {
    type: DataTypes.TEXT,
    field: 'access_token',
    allowNull: false
  },
  accessTokenExpiresOn: {
    type: DataTypes.DATE,
    field: 'access_token_expires_on',
    allowNull: false
  },
  clientId: {
    type: DataTypes.TEXT,
    field: 'client_id',
    allowNull: false
  },
  refreshToken: {
    type: DataTypes.TEXT,
    field: 'refresh_token',
    allowNull: false
  },
  refreshTokenExpiresOn: {
    type: DataTypes.DATE,
    field: 'refresh_token_expires_on',
    allowNull: false
  },
  studentId: {
    type: DataTypes.BIGINT,
    field: 'student_id',
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'OAuthToken',
  tableName: 'oauth_tokens',
  timestamps: false
});

export { OAuthToken };
