// routes/authRoutes.js

import express from 'express';
import multer from 'multer';
import path from 'path';
import { registerUser, loginUser  } from '../controllers/auth.controller.js';

const router = express.Router();

// File upload setup
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});
const upload = multer({ storage });

// Routes
router.post('/register', upload.single('profilePic'), registerUser);
router.post('/login', loginUser);


export default router;
