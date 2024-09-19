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
const communicationRoutes = require('./src/routes/communicationRoutes');

app.use('/api', ticketRoutes);
app.use('/api', customerRoutes);
app.use('/api',managerRoutes)
// app.use('/api', userRoutes);
app.use('/api', notificationRoutes);
app.use('/api', agentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api',communicationRoutes);

// Example protected route
// app.get('/api/manager', checkRole(['manager']), (req, res) => {
//     res.send('Admin access granted');
// });

// Database Connection
mongoose.connect(process.env.MONGO_URI  || 'mongodb://127.0.0.1:27017/support_ticketing_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(process.env.PORT || 3001, () => {
    console.log(`Server running on port ${process.env.PORT || 3001}`);
});
