import express from 'express';
import { registerContest, getUpcomingContests,getAllRegistrations ,updateRegistrationStatus,searchByGameUID } from '../controllers/RegsistrationController.js';

const router = express.Router();

router.post('/register', registerContest);
router.get('/upcoming', getUpcomingContests);
router.get('/all', getAllRegistrations); // GET /api/register/all
router.patch('/update-status/:id', updateRegistrationStatus);
router.get("/search", searchByGameUID);


export default router;
