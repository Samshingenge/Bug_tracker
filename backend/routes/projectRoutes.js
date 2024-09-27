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
const Project = require('../models/Project'); // Assuming you have a Project model

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



module.exports = router;
