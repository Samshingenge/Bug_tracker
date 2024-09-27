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
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { login, register, getUserProfile } = require('../controllers/authController');

router.post('/login', login);
router.post('/register', register);
router.get('/user', protect, getUserProfile);

// Sample user data - replace with actual authentication logic
// router.get('/user', (req, res) => {
//     const user = {
//       id: '12345',
//       name: 'John Doe',
//       email: 'john.doe@example.com',
//     };
  
//     res.json(user); // Send the user data to the frontend
//   });

module.exports = router;
