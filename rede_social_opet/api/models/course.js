import sequelize from 'sequelize'
const { DataTypes, Model } = sequelize
import { db } from './../db.js'
import { Student } from './student.js'

class Course extends Model {}

Course.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize: db,
  modelName: 'Course',
  tableName: 'courses',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Course.belongsToMany(Student, {
  through: 'students_courses',
  as: 'students',
  foreignKey: 'course_id'
})

export { Course }
