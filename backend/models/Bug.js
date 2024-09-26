// const mongoose = require('mongoose');

// const bugSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
//   status: { type: String, enum: ['Open', 'In Progress', 'Resolved', 'Closed'], default: 'Open' },
//   assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
//   dueDate: { type: Date },
// }, { timestamps: true });

// module.exports = mongoose.model('Bug', bugSchema);

const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
    status: { type: String, enum: ['Open', 'In Progress', 'Resolved', 'Closed'], default: 'Open' },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    dueDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Bug', bugSchema);

