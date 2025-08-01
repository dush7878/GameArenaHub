import express from 'express';
import {
  getUsers,
  updateUser,
  deleteUser
} from '../controllers/adminUser.controller.js';

const router = express.Router();

// Publicly accessible (not secure)
router.get('/users', getUsers);
router.patch('/users/:userId', updateUser);
router.delete('/users/:userId', deleteUser);

export default router;
