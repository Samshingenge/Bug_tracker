const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Define permissions for different roles
const rolePermissions = {
  admin: ['create', 'read', 'update', 'delete'],
  product_manager: ['read', 'update'],
  developer: ['read', 'update'],
  user: ['read']
};

// Middleware to check user permissions
const checkPermission = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userPermissions = rolePermissions[user.role] || [];

      if (userPermissions.includes(requiredPermission)) {
        req.user = user;
        next();
      } else {
        res.status(403).json({ message: 'Permission denied' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
};

// User registration function
const registerUser = async (userData) => {
  try {
    const { fullName, email, password, company, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      company,
      role
    });

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { message: 'User registered successfully', token };
  } catch (error) {
    throw new Error('Registration failed: ' + error.message);
  }
};

// User login function
const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { message: 'Login successful', token, user: { id: user._id, fullName: user.fullName, role: user.role } };
  } catch (error) {
    throw new Error('Login failed: ' + error.message);
  }
};

module.exports = { checkPermission, registerUser, loginUser };