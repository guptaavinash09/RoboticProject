// backend/server.js

require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors'); // Required for cross-origin requests

dotenv.config(); // Load environment variables
connectDB(); // Connect to MongoDB

const app = express();

// Middleware
app.use(express.json()); // Allows parsing of JSON request bodies
app.use(express.urlencoded({ extended: false })); // Allows parsing of URL-encoded request bodies

// CORS setup (important for connecting frontend and backend)
// For development, allow all origins. For production, restrict to your frontend domain.
app.use(cors({
  origin: '*', // Allow all origins for development
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/tasks', taskRoutes); // Task management routes

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware (should be placed after all routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

