// const Project = require('../models/projectModel');

// exports.getAllProjects = async (req, res) => {
//   try {
//     const projects = await Project.find({ user: req.user.id });
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching projects', error: error.message });
//   }
// };

// exports.createProject = async (req, res) => {
//   try {
//     const { name, description } = req.body;
//     const project = new Project({
//       name,
//       description,
//       user: req.user.id
//     });
//     const savedProject = await project.save();
//     res.status(201).json(savedProject);
//   } catch (error) {
//     res.status(400).json({ message: 'Error creating project', error: error.message });
//   }
// };


const Project = require('../models/Project');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Ensure req.user is populated by authentication middleware
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Create a new project
    const project = new Project({
      name,
      description,
      user: req.user.id  // Changed back to 'user' to match the database structure
    });

    // Save the project to the database
    const savedProject = await project.save();

    // Return the saved project in the response
    res.status(201).json(savedProject);
  } catch (error) {
    // Error handling
    console.error('Error creating project:', error);
    res.status(400).json({ message: 'Error creating project', error: error.message });
  }
};