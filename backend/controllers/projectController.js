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
    const project = new Project({
      name,
      description,
      user: req.user.id
    });
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: 'Error creating project', error: error.message });
  }
};