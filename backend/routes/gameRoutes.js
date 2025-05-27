import express from 'express';
import multer from 'multer';// multer setup
import { addGame, getGames, deleteGame } from '../controllers/gameCotroller.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('logo'), addGame);
router.get('/', getGames);
router.delete('/:id', deleteGame);

export default router;
