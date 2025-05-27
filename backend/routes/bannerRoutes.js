import express from 'express';
import multer from 'multer';
import { storage } from '../config/cloudinary.js';
import {
  getAllBanners,
  uploadBanner ,
  toggleBannerStatus,
  deleteBanner,
} from '../controllers/bannerController.js';

const router = express.Router();
const upload = multer({ storage });
// /api/banners
router.get('/', getAllBanners);
router.post('/upload', upload.single('image'), uploadBanner);
router.patch('/:id/toggle', toggleBannerStatus);
router.delete('/:id', deleteBanner);

export default router;
