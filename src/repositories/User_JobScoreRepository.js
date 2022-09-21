import User_JobScore from '../models/User_JobScoreModel.js';
import { User_JobScoreAttrs } from '../models/User_JobScoreAttrs.js';

const createUser_JobScore = async (userId, jobId, status='neutro') => {
  const user_job = await User_JobScore.create({
    [User_JobScoreAttrs.userId]: userId,
    [User_JobScoreAttrs.jobId]: jobId,
    [User_JobScoreAttrs.status]: status,
  });
  return user_job;
};

const getUser_JobScoreStatus = async (userId, jobId) => {
  const status_userjob = await User_JobScore.findOne({
    where: {
      [User_JobScoreAttrs.userId]: userId,
      [User_JobScoreAttrs.jobId]: jobId
    },
    attributes:{
      exclude: [User_JobScoreAttrs.userId, User_JobScoreAttrs.jobId]
    },
  })

  return status_userjob
}

const updateUser_JobScoreStatus = async (body,userId, jobId) => {
  if (body.status == getUser_JobScoreStatus(userId, jobId)){
    body.status = 'neutro'
  }
  const queryResult = await User_JobScore.update(body, {
    where: {
      [User_JobScoreAttrs.userId]: userId,
      [User_JobScoreAttrs.jobId]: jobId,
    }});
  if (queryResult[0] === 0) throw new Error('falha na operação.');
  return queryResult;
}

export default { createUser_JobScore,  getUser_JobScoreStatus,  updateUser_JobScoreStatus };
