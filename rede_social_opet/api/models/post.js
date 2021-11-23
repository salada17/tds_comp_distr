import sequelize from 'sequelize';
import { db } from '../db.js';
import { Student } from './student.js';
import { Course } from './course.js';

const { DataTypes, Model } = sequelize;

class Post extends Model {}

Post.init({
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  studentId: {
    field: 'student_id',
    type: DataTypes.INTEGER,
    references: {
      model: Student,
      key: 'id',
    },
  },
  courseId: {
    field: 'course_id',
    type: DataTypes.INTEGER,
    references: {
      model: Course,
      key: 'id',
    },
  },
}, {
  sequelize: db,
  modelName: 'Post',
  tableName: 'posts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

export { Post };
