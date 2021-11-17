import sequelize from 'sequelize';
import { db } from '../db.js';
import bcrypt from 'bcrypt';

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
  password: {
    type: DataTypes.STRING,
    allowNull: false
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
  hooks: {
    beforeCreate: async student => {
      const salt = bcrypt.genSaltSync();
      student.password = bcrypt.hashSync(student.password, salt);
    }
  }
});

Student.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
}

export { Student };
