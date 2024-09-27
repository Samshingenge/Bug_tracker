// // // middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// exports.authMiddleware = async (req, res, next) => {
//   let token;
  
//   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select('-password');
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Not authorized, token failed' });
//   }
// };

// module.exports=



const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the path is correct
const bcrypt = require('bcryptjs'); // Make sure to import bcrypt if you're using it

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  console.log('Headers:', req.headers);

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('Token found:', token);
  } else {
    console.log('No token found in Authorization header');
  }

  if (!token) {
    console.log('No token, sending 401');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    console.log('Attempting to verify token');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    // Change this line
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      console.log('No user found with id:', decoded.userId);
      return res.status(401).json({ message: 'User not found' });
    }
    console.log('User found:', user);

    req.user = user;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Login function to authenticate user and return token
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = {
      userId: user.id  // Change this line
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ 
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Export the protect middleware
module.exports = { protect };

