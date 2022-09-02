import express from 'express';
import {
  getAllProfiles,
  getProfileById,
  updateProfile,
  createProfile,
  deleteProfile,
  getOwnPerfil
} from '../controllers/Profiles.js';

const router = express.Router();

//Routes for Profiles
router.get('/', getAllProfiles);
router.get('/:id', getProfileById);
router.get('/meuperfil/:id', getOwnPerfil)
router.patch('/:id', updateProfile);
router.post('/', createProfile);
router.delete('/:id', deleteProfile);
export default router;
