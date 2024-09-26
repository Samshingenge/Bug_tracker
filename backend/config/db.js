// // /backend/config/db.js
const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
    });
    console.log('MongoDB connected successfully');
    
    // Log the connection details
    const db = mongoose.connection;
    console.log(`Connected to database: ${db.name}`);
    console.log(`Host: ${db.host}`);
    console.log(`Port: ${db.port}`);
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    
    // More detailed error logging
    if (err.name === 'MongooseServerSelectionError') {
      console.error('Could not connect to MongoDB server. Please check if the server is running and accessible.');
      console.error('Connection URI:', process.env.MONGO_URI);
    }
    
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
 

// config/db.js
// const mongoose = require('mongoose');

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB connected...');
//     } catch (err) {
//         console.error('MongoDB connection error:', err);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;
