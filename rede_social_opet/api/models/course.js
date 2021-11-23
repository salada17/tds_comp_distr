import sequelize from 'sequelize';
import { db } from '../db.js';

const { DataTypes, Model } = sequelize;

class Course extends Model {}

Course.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize: db,
  modelName: 'Course',
  tableName: 'courses',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export { Course };
