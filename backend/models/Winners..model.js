import mongoose from 'mongoose';

const winnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  game: { type: String, required: true },
  gameUid: { type: String, required: true },
  contest: { type: String, required: true },
  prize: { type: String, required: true },
  profile: { type: String, required: true },
  status: { type: String,default: 'deactivate', enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

export default mongoose.model('Winner', winnerSchema);
