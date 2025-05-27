import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isActive: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Banner', bannerSchema);
