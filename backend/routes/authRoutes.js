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
const { registerUser, loginUser } = require('../middleware/auth');
const { login, register, getUserProfile } = require('../controllers/authController');

// router.post('/login', login);
// router.post('/register', register);
router.get('/user', protect, getUserProfile);

router.post('/register', async (req, res) => {
    try {
      const result = await registerUser(req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const result = await loginUser(email, password);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  });

module.exports = router;
