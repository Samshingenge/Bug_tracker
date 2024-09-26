// const mongoose = require('mongoose');

// const projectSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
// }, { timestamps: true });

// module.exports = mongoose.model('Project', projectSchema);


const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { 
        type: String, required: true 
    },
    description: {
         type: String 
        },
    status: { 
        type: String, default: 'In Progress'
     },  // Add status field with default value
    user: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);

