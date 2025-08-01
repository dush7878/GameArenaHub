// models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  displayGameName: String,
  gameUID: { type: String, required: true },
  gameName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String }, // URL or file path

  status: { type: String, default: 'active' },
  wallet: { type: Number, default: 0 },
  winningMoney: { type: Number, default: 0 },
  matches: { type: Number, default: 0 },
  gameContests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GameContest' }],
}, { timestamps: true });

export default mongoose.model('User', userSchema);
