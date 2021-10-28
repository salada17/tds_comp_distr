import sequelize from 'sequelize';
import { db } from '../db.js';
import { Course } from './course.js';

const { DataTypes, Model } = sequelize;

class Student extends Model {}

Student.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  registrationCode: {
    type: DataTypes.STRING,
    field: 'registration_code',
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Student',
  tableName: 'students',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

Student.belongsToMany(Course, {
  through: 'students_courses',
  as: 'courses',
  foreignKey: 'student_id',
});

export { Student };
