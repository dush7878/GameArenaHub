import express from 'express';
import {
  createReview,
  getReviews,
  deleteReview,
  toggleReviewStatus,
} from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', createReview);
router.get('/', getReviews);
router.delete('/:id', deleteReview);
router.patch('/:id/toggle', toggleReviewStatus);

export default router;
