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
const User = require('../models/User');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().lean();

    // Get all unique user IDs from the projects
    const userIds = [...new Set(projects.map(project => project.user))];

    // Fetch all users in one query
    const users = await User.find({ _id: { $in: userIds } }).lean();

    // Create a map of user IDs to user objects for quick lookup
    const userMap = users.reduce((map, user) => {
      map[user._id.toString()] = user;
      return map;
    }, {});

    // Attach user data to each project
    const projectsWithUsers = projects.map(project => ({
      ...project,
      user: userMap[project.user.toString()]
    }));

    res.json(projectsWithUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).lean();
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const user = await User.findById(project.user).lean();
    
    res.json({ ...project, user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
};


// In projectController.js
exports.updateProjectStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.status = status;
    await project.save();

    res.json({ message: "Status updated", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// exports.getAllProjects = async (req, res) => {
//   try {
//     const projects = await Project.find({ user: req.user.id });
//     res.json(projects);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching projects', error: error.message });
//   }
// };

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






//     use bugTrackerDB


//   db.collectionName.deleteTwo({ _id: ObjectId("66f6739779694108d311bd90") })

//   db.collectionName.deleteMany({ _id: ObjectId("66f6739779694108d311bd90") }


//   db.projects.find({ _id: ObjectId("66f6739779694108d311bd90") })
//# No result, meaning the document was deleted
