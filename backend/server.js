require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const bugRoutes = require('./routes/bugRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// app.get('/',(req,res)=>{
//   const
// })

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/bugs', bugRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



// require('dotenv').config();  // Load environment variables
// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');  // Import the connectDB function
// const authRoutes = require('./routes/authRoutes');
// const projectRoutes = require('./routes/projectRoutes');
// const bugRoutes = require('./routes/bugRoutes');

// const app = express();
// const PORT = process.env.PORT || 5000;

// console.log('Environment variables:', process.env.PORT, process.env.MONGO_URI);

// // CORS Configuration
// const corsOptions = {
//   origin: 'http://localhost:5173', // or your frontend URL
//   optionsSuccessStatus: 200
// };

// // Middleware
// app.use(cors(corsOptions));
// app.use(express.json()); // For parsing JSON data

// // Connect to MongoDB
// connectDB();  // Call the connectDB function

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/bugs', bugRoutes);


// // Root endpoint
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error('Error details:',err);
//   res.status(500).send('Something broke!');
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
//   console.log('Environment:', process.env.NODE_ENV);
//   console.log('MongoDB URI:', process.env.MONGO_URI);
// }).on('error', (err) =>{
//   console.error('Server error:', err);
//   process.exit(1);
// })
