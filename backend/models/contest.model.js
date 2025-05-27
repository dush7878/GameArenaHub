import mongoose from 'mongoose';

const contestSchema = new mongoose.Schema({
  banner: { type: String, required: true },
  game: { type: String, enum: ['Free Fire', 'PUBG', 'COD'], required: true },
  title: { type: String, required: true },
  dateTime: { type: Date, required: true },
  status: { type: String, enum: ['upcoming', 'live', 'ended'], default: 'upcoming' },
  entryFees: { type: Number, required: true },
}, { timestamps: true });

const Contest = mongoose.model('Contest', contestSchema);
export default Contest;
