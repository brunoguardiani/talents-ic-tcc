import express from 'express';

import { getAllJobs, createJob, getJobById, updateJob, deleteJob, applyToJob, updateStatusJob, getFeedbackStatus } from '../controllers/Jobs.js';

const router = express.Router();

//Routes for Job
router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', createJob);
router.post('/aplicacao', applyToJob);
router.patch('/:id', updateJob);
router.delete('/:id', deleteJob);
router.put('/:id', updateStatusJob)
router.get('/feedback/:id/', getFeedbackStatus)

export default router;
