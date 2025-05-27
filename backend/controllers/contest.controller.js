import Contest from '../models/contest.model.js';
import { v2 as cloudinary } from 'cloudinary';

export const getContests = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const contests = await Contest.find(filter).sort({ dateTime: 1 });
    res.json(contests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contests' });
  }
};

export const createContest = async (req, res) => {
  try {
    const { game, title, dateTime, status, entryFees } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Banner image is required' });
    }
    if (!game || !title || !dateTime || entryFees == null) {
      return res.status(400).json({ message: 'All fields except status are required' });
    }

    // Validate dateTime
    const parsedDate = new Date(dateTime);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: 'Invalid dateTime format' });
    }

    // Upload banner image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'contests/banners',
      resource_type: 'image',
    });

    // Allowed statuses
    const allowedStatuses = ['upcoming', 'live', 'ended'];
    const contestStatus = allowedStatuses.includes(status) ? status : 'upcoming';

    // Create contest with banner URL from Cloudinary
    const contest = new Contest({
      banner: result.secure_url,
      game,
      title,
      dateTime: parsedDate,
      status: contestStatus,
      entryFees,
    });

    await contest.save();

    res.status(201).json(contest);
  } catch (err) {
    console.error('Create contest error:', err);
    res.status(500).json({ message: 'Failed to create contest' });
  }
};


export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['upcoming', 'live', 'ended'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const contest = await Contest.findById(id);
    if (!contest) return res.status(404).json({ message: 'Contest not found' });

    contest.status = status;
    await contest.save();

    res.json(contest);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status' });
  }
};

export const deleteContest = async (req, res) => {
  try {
    const { id } = req.params;
    await Contest.findByIdAndDelete(id);
    res.json({ message: 'Contest deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete contest' });
  }
};
