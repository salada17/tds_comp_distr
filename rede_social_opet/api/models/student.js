import sequelize from 'sequelize'
const { DataTypes, Model } = sequelize
import { db } from './../db.js'
import { Course } from './course.js'

class Student extends Model {}

Student.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  registrationCode: {
    type: DataTypes.STRING,
    field: 'registration_code',
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'Student',
  tableName: 'students',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Student.belongsToMany(Course, {
  through: 'students_courses',
  as: 'courses',
  foreignKey: 'student_id'
})

export { Student }
