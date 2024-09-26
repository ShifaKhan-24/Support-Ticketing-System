const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// Routes
const authRoutes = require('./src/routes/authRoutes');
const ticketRoutes = require('./src/routes/ticketRoutes');
const customerRoutes = require('./src/routes/customerRoutes');
const managerRoutes = require('./src/routes/managerRoutes');
const agentRoutes = require('./src/routes/agentRoutes');
const userRoutes = require('./src/routes/userRoutes');
const notificationRoutes = require('./src/routes/notificationRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const communicationRoutes = require('./src/routes/communicationRoutes');

app.use('/api', ticketRoutes);
app.use('/api', customerRoutes);
app.use('/api', managerRoutes);
app.use('/api', categoryRoutes);
app.use('/api', notificationRoutes);
app.use('/api', agentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', communicationRoutes);

// Database Connection Logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/support_ticketing_system', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit process with failure
  }
};

// Initialize Database Connection
connectDB();

// Start the server only if not in test mode
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;  // Export the app for testing
