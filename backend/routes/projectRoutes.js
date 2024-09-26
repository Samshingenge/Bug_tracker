
// const express = require('express');
// const router = express.Router();
// const { createProject, getAllProjects, getProjectById, updateProject, deleteProject } = require('../controllers/projectController');
// const { authMiddleware } = require('../middleware/authMiddleware');

// // Create a new project
// router.post('/', authMiddleware, createProject);

// // Get all projects
// router.get('/', authMiddleware, getAllProjects);

// // Get project by ID
// router.get('/:id', authMiddleware, getProjectById);

// // Update a project
// router.put('/:id', authMiddleware, updateProject);

// // Delete a project
// router.delete('/:id', authMiddleware, deleteProject);

// // Export the router
// module.exports = router;






const express = require('express');
const router = express.Router();
const { createProject, getAllProjects, getProjectById, updateProject, deleteProject } = require('../controllers/projectController');
// const { authMiddleware } = require('../middleware/authMiddleware');

// Create a new project
router.post('/', createProject);

// Get all projects
router.get('/', getAllProjects);

// Get project by ID
router.get('/:id', getProjectById);

// Update a project
router.put('/:id', updateProject);

// Delete a project
router.delete('/:id', deleteProject);

// Export the router
module.exports = router;

