import sequelize from 'sequelize';
import { db } from '../db.js';

const { DataTypes, Model } = sequelize;

class CoursePeriod extends Model {}

CoursePeriod.init({
  period: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  courseId: {
    field: 'course_id',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: 'id',
    },
  }
}, {
  sequelize: db,
  modelName: 'CoursePeriod',
  tableName: 'course_periods',
  timestamps: false
});

export { CoursePeriod };
