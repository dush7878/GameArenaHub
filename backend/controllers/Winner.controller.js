import Winner from '../models/Winners..model.js';
import { cloudinary } from '../config/cloudinary.js';
import fs from 'fs';

export const createWinner = async (req, res) => {
  try {
    const { name, game, gameUid, contest, prize } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Profile image is required' });
    }

    const upload = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path); // remove local file

    const newWinner = new Winner({
      name,
      game,
      gameUid,
      contest,
      prize,
      profile: upload.secure_url,
    });

    await newWinner.save();
    res.status(201).json(newWinner);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add winner', error: err.message });
  }
};

export const getAllWinners = async (req, res) => {
  try {
    const winners = await Winner.find().sort({ createdAt: -1 });
    res.status(200).json(winners);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch winners' });
  }
};

export const toggleWinnerStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const winner = await Winner.findById(id);

    if (!winner) {
      return res.status(404).json({ message: 'Winner not found' });
    }

    winner.status = winner.status === 'active' ? 'inactive' : 'active';
    await winner.save();

    res.status(200).json({ message: 'Status updated', status: winner.status });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status' });
  }
};

export const deleteWinner = async (req, res) => {
  try {
    const { id } = req.params;
    await Winner.findByIdAndDelete(id);
    res.status(200).json({ message: 'Winner deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete winner' });
  }
};

export const getActiveWinners = async (req, res) => {
  try {
    const winners = await Winner.find({ status: 'active' });
    res.status(200).json(winners);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch active winners' });
  }
};