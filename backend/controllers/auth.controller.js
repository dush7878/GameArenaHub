// controllers/authController.js

import bcrypt from 'bcryptjs';
import User from '../models/User.schema.js';
import path from 'path';
import fs from 'fs';
import { cloudinary } from '../config/cloudinary.js';
import jwt from 'jsonwebtoken';


export const registerUser = async (req, res) => {
  try {
    const {
      name,
      displayGameName,
      gameUID,
      gameName,
      phone,
      password,
    } = req.body;

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'Profile picture is required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'profile_pics',
    });

    // Remove local file
    fs.unlinkSync(file.path);

    // Create user
    const newUser = new User({
      name,
      displayGameName,
      gameUID,
      gameName,
      phone,
      password: hashedPassword,
      profilePic: result.secure_url,
      status: 'active',
      wallet: 0,
      winningMoney: 0,
      matchesPlayed: 0,
      gameContests: [],
    });

    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error('Register Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// export const registerUser = async (req, res) => {
//   try {
//     const { gameUID, gameName, phone, password } = req.body;
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ message: 'Profile picture is required' });
//     }

//     const existingUser = await User.findOne({ phone });
//     if (existingUser) {
//       return res.status(409).json({ message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const profilePicPath = `/uploads/${file.filename}`;

//     const newUser = new User({
//       gameUID,
//       gameName,
//       phone,
//       password: hashedPassword,
//       profilePic: profilePicPath,
//     });

//     await newUser.save();

//     res.status(201).json({ message: 'Registration successful' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


export const loginUser = async (req, res) => {
  const { phone, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid phone or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '7d' }
    );

    // Send token (and optionally user data)
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        displayGameName: user.displayGameName,
        phone: user.phone,
        gameUID: user.gameUID,
        gameName: user.gameName,
        profilePic: user.profilePic,
        status: user.status,
      },
    });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
