import Game from '../models/gameModal.js';
import cloudinary from 'cloudinary';

export const addGame = async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;

    if (!name || !file) {
      return res.status(400).json({ message: 'Game name and logo are required' });
    }

    const uploaded = await cloudinary.v2.uploader.upload(file.path, {
      folder: 'games',
      transformation: [{ width: 64, height: 64, crop: 'fill' }],
    });

    const game = new Game({
      name,
      logo: uploaded.secure_url,
    });

    await game.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add game' });
  }
};

export const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch games' });
  }
};

export const deleteGame = async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.json({ message: 'Game deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete game' });
  }
};
