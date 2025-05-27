import express from 'express';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });
import {
  getContests,
  createContest,
  updateStatus,
  deleteContest,
} from '../controllers/contest.controller.js';

const router = express.Router();

router.get('/', getContests);
router.post('/create', upload.single('banner'), createContest);
router.patch('/:id/status', updateStatus);
router.delete('/:id', deleteContest);

export default router;
