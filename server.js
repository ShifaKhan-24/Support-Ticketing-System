const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// Routes
const ticketRoutes = require('./src/routes/ticketRoutes');
// const userRoutes = require('./src/routes/userRoutes');
// const notificationRoutes = require('./src/routes/notificationRoutes');

app.use('/api', ticketRoutes);
// app.use('/api', userRoutes);
// app.use('/api', notificationRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI  || 'mongodb://127.0.0.1:27017/support_ticketing_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
