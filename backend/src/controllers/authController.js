const bcrypt = require('bcrypt');
const User = require('../models/User');
const Admin = require('../models/admin');

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;



  try {
    const admin = await Admin.findOne({ email });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.status(200).json({ message: 'Admin login successful', role: 'admin' });
    } else {
      const user = await User.findOne({ email });

  

      if (user && (await bcrypt.compare(password, user.password))) {
   
        res.status(200).json({ message: 'User login successful', role: 'user' });
      } else {
       
        res.status(401).json({ message: 'Invalid email or password' });
      }
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).json({ message: 'Internal server error during logout' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};

module.exports = { signup, login , logout};
