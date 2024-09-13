// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Sign up
export const signup = async (req, res) => {
  const { email, password, role } = req.body;

  // Create new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, role });
  await newUser.save();

  // Create JWT
  const token = jwt.sign({ _id: newUser._id, role: newUser.role }, process.env.JWT_TOKEN);
  res.json({ token });
};

// Log in
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Create JWT
  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_TOKEN);
  res.json({ token });
};

