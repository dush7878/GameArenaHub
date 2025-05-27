import Registration from '../models/ContestRegistration.model.js';
import Contest from '../models/contest.model.js';

export const registerContest = async (req, res) => {
  try {
    const {
      name, number, gameUid, game, instagramId,
      gameLevel, contestName, transactionId, acceptedTerms
    } = req.body;

    if (!name || !number || !gameUid || !game || !contestName || !transactionId || !acceptedTerms) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    const registration = new Registration({
      name,
      number,
      gameUid,
      game,
      instagramId,
      gameLevel,
      contestName,
      transactionId,
      acceptedTerms,
    });

    await registration.save();
    res.status(201).json({ message: 'Registration successful', registration });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

export const getUpcomingContests = async (req, res) => {
  try {
    const contests = await Contest.find({ status: 'upcoming' });
    res.json(contests);
  } catch {
    res.status(500).json({ message: 'Failed to fetch contests' });
  }
};

export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.status(200).json(registrations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch registrations' });
  }
};

export const updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Registration.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Registration not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update status' });
  }
};


export const searchByGameUID = async (req, res) => {
  try {
    const { uid } = req.query;

    if (!uid) {
      return res.status(400).json({ message: "Game UID is required" });
    }

    const registration = await Registration.findOne({
      gameUid: uid,
      status: "approved",
    });

    if (!registration) {
      return res.status(404).json({ message: "No approved registration found" });
    }

    return res.status(200).json({
      name: registration.name,
      contestName: registration.contestName,
      gameUid: registration.gameUid,
      status: registration.status,
    });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ message: "Server error while searching" });
  }
};

