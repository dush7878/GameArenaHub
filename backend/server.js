import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import adminRoutes from './routes/admin.js';
import bannerRoutes from './routes/bannerRoutes.js';
import contestRoutes from './routes/contest.routes.js';
import ContestRegistrationRoute from './routes/ContestRoutes.js'
import WinnerRoutes from './routes/winner.routes.js'
import GamesRoutes from './routes/gameRoutes.js'
import ReviewRoutes from './routes/reviewRoutes.js'
import reviewModel from './models/review.model.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use('/api/admin', adminRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/contests', contestRoutes);
app.use('/api/contest', ContestRegistrationRoute);
app.use('/api/winner', WinnerRoutes);
app.use('/api/games', GamesRoutes);
app.use('/api/reviews', ReviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
