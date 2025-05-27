import Review from '../models/review.model.js';
import Game from '../models/gameModal.js'; // Optional, for game validation

// CREATE Review
export const createReview = async (req, res) => {
  try {
    const { name, game, review, rating, status } = req.body;

    if (!name || !game || !review || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newReview = new Review({
      name,
      game,
      review,
      rating,
      status: status || 'active',
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create review' });
  }
};

// GET all reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch {
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
};

// TOGGLE Status
export const toggleReviewStatus = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    review.status = review.status === 'active' ? 'inactive' : 'active';
    await review.save();
    res.json(review);
  } catch {
    res.status(500).json({ message: 'Failed to update review' });
  }
};

// DELETE
export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch {
    res.status(500).json({ message: 'Delete failed' });
  }
};
