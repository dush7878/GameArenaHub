import express from 'express';
import multer from 'multer';
import { createWinner, getAllWinners ,toggleWinnerStatus ,deleteWinner, getActiveWinners} from '../controllers/Winner.controller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/create', upload.single('profile'), createWinner);
router.get('/all', getAllWinners);
router.put('/status/:id', toggleWinnerStatus);
router.delete('/delete/:id', deleteWinner);
router.get('/active', getActiveWinners);

export default router;
