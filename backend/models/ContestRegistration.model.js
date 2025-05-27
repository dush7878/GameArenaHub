import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  name: String,
  number: String,
  gameUid: String,
  game: String,
  instagramId: String,
  gameLevel: String,
  contestName: String,
  transactionId: String,
  acceptedTerms: Boolean,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Registration', registrationSchema);
