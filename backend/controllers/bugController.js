// const Bug = require('../models/Bug');

// exports.createBug = async (req, res) => {
//   const { title, description, priority, assignee, project, dueDate } = req.body;
//   try {
//     const bug = new Bug({ title, description, priority, assignee, project, dueDate });
//     await bug.save();
//     res.status(201).json(bug);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// exports.getAllBugs = async (req, res) => {
//   try {
//     const bugs = await Bug.find({ project: req.params.projectId }).populate('assignee');
//     res.status(200).json(bugs);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.getBugById = async (req, res) => {
//   try {
//     const bug = await Bug.findById(req.params.id).populate('assignee');
//     if (!bug) return res.status(404).json({ message: 'Bug not found' });
//     res.status(200).json(bug);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.updateBug = async (req, res) => {
//   const { title, description, priority, status, assignee, dueDate } = req.body;

//   try {
//     const bug = await Bug.findById(req.params.id);
//     if (!bug) return res.status(404).json({ message: 'Bug not found' });

//     bug.title = title || bug.title;
//     bug.description = description || bug.description;
//     bug.priority = priority || bug.priority;
//     bug.status = status || bug.status;
//     bug.assignee = assignee || bug.assignee;
//     bug.dueDate = dueDate || bug.dueDate;

//     await bug.save();
//     res.status(200).json(bug);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.deleteBug = async (req, res) => {
//   try {
//     const bug = await Bug.findById(req.params.id);
//     if (!bug) return res.status(404).json({ message: 'Bug not found' });

//     await bug.remove();
//     res.status(200).json({ message: 'Bug removed' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.getAllBugs = async (req, res) => {
//   try {
//     const bugs = await Bug.find().populate('assignee project');
//     res.status(200).json(bugs);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.createBug = async (req, res) => {
//   const bug = new Bug(req.body);
//   try {
//     const newBug = await bug.save();
//     res.status(201).json(newBug);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };


// Export functions to get, create, update, and delete bugs
// module.exports = { getAllBugs, createBug };


const Bug = require('../models/Bug');

exports.createBug = async (req, res) => {
    try {
        const bug = await Bug.create({ ...req.body });
        res.status(201).json(bug);
    } catch (err) {
        res.status(500).json({ message: 'Error creating bug', error: err });
    }
};
