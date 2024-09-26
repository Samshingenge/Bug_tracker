const Project = require('../models/Project');

// In createProject Full UPdate
exports.createProject = async (req, res) => {
    const { name, description, status } = req.body;  // Accept status from request body
    try {
      const project = new Project({ name, description, status });
      await project.save();
      res.status(201).json(project);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id }).populate('teamMembers');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
// exports.getAllProjects = async (req, res) => {
//   try {
//       const projects = await Project.find({ user: req.user._id });
//       res.json(projects);
//   } catch (err) {
//       res.status(500).json({ message: 'Error fetching projects', error: err });
//   }
// };


exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('teamMembers');
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// In updateProject Full Update
exports.updateProject = async (req, res) => {
    const { name, description, status } = req.body;
  
    try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.status(404).json({ message: 'Project not found' });
  
      project.name = name || project.name;
      project.description = description || project.description;
      project.status = status || project.status;  // Allow updating status
  
      await project.save();
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await project.remove();
    res.status(200).json({ message: 'Project removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// const Project = require('../models/Project');

