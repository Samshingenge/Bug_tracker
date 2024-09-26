// // routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
// // const { authMiddleware } = require('../middleware/authMiddleware');

// // Register new user
// router.post('/register', registerUser);

// // Login user
// router.post('/login', loginUser);

// // Get user profile (protected route)
// router.get('/profile', authMiddleware, getUserProfile);

// module.exports = router;


const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
