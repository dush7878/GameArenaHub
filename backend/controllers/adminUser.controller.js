import User from '../models/User.schema.js';

// Get all users, optionally filtered by gameName
export const getUsers = async (req, res) => {
  try {
    const { gameName } = req.query;
    const query = gameName ? { gameName: { $regex: gameName, $options: 'i' } } : {};
    const users = await User.find(query).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Update user (status, wallet, winningMoney)
// Update user (status, wallet, winningMoney)
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status, addWallet, addWinning } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update status if provided
    if (status) user.status = status;

    // Increment wallet and winningMoney
    if (addWallet) user.wallet += parseFloat(addWallet);
    if (addWinning) user.winningMoney += parseFloat(addWinning);

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Update failed' });
  }
};


// Delete user
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
};
