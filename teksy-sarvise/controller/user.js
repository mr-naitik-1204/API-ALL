const User = require('../modal/user');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get user details
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user trip history
exports.getTripHistory = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('tripHistory.taxiId');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user.tripHistory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
