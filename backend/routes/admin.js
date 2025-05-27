import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Admin login route
router.post('/login', (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    res.json({ success: true, token: 'admin-access-token' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

export default router;
