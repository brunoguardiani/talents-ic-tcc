import { Sequelize } from 'sequelize';
import { User_JobScoreAttrs } from './User_JobScoreAttrs.js';
import db from '../config/database.js';
import User from './UserModel.js';
import Job from './JobModel.js';

const { DataTypes } = Sequelize;

const User_JobScore = db.define(
  'user_job_score',
  { 
    [User_JobScoreAttrs.id]: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    [User_JobScoreAttrs.status]: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { timestamps: false }
);

//Super M:N association
User_JobScore.belongsTo(Job, { onDelete: 'CASCADE' });
User_JobScore.belongsTo(User, { onDelete: 'CASCADE' });
Job.hasMany(User_JobScore, { onDelete: 'CASCADE' });
User.hasMany(User_JobScore, { onDelete: 'CASCADE' });

export default User_JobScore;
