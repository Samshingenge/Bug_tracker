//  routes/bugRoutes.js
// const express = require('express');
// const router = express.Router();
// const { createBug, getAllBugs, getBugById, updateBug, deleteBug } = require('../controllers/bugController');
// const { authMiddleware } = require('../middleware/authMiddleware');

// // Create a new bug/task
// router.post('/', authMiddleware, createBug);

// // Get all bugs for a project
// router.get('/:projectId', authMiddleware, getAllBugs);

// // Get bug by ID
// router.get('/bug/:id', authMiddleware, getBugById);

// // Update a bug/task
// router.put('/bug/:id', authMiddleware, updateBug);

// // Delete a bug/task
// router.delete('/bug/:id', authMiddleware, deleteBug);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { checkPermission } = require('../middleware/auth');

// Protected route example
router.post('/create', checkPermission('create'), (req, res) => {
  // Create bug logic here
});

router.get('/', checkPermission('read'), (req, res) => {
  // Get bugs logic here
});

// ... other routes

module.exports = router;

