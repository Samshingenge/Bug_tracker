const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Get user profile
router.get('/profile', protect, getUserProfile);

// Update user profile
router.put('/profile', protect, updateUserProfile);

router.get('/user', protect, (req, res) => {
    // This should only be reached if authMiddleware passes
    res.json({ user: req.user });
  });

module.exports = router;