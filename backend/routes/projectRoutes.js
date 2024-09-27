// const express = require('express');
// const router = express.Router();
// const { getAllProjects, createProject } = require('../controllers/projectController');
// const { protect } = require('../middleware/authMiddleware');

// // Get all projects
// router.get('/', protect, getAllProjects);

// // Create a new project
// router.post('/', protect, createProject);

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const { getAllProjects, createProject } = require('../controllers/projectController');
// const { protect } = require('../middleware/authMiddleware');

// router.route('/')
//   .get(protect, getAllProjects)
//   .post(protect, createProject);

// module.exports = router;

const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); // Ensure the correct path to your Project model
const { createProject } = require('../controllers/projectController'); // Import createProject controller
const { protect } = require('../middleware/authMiddleware');

// Route to get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();  // Fetch all projects from MongoDB
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

console.log('createProject:', createProject);
console.log('typeof createProject:', typeof createProject);
console.log('Exporting createProject:', exports.createProject);
console.log('authMiddleware:', protect);
console.log('typeof authMiddleware:', typeof protect);

// Route to create a new project (protected route)
router.post('/', protect, createProject);



module.exports = router;

