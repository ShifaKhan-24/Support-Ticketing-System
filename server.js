const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerSpecs = require('./src/config/swaggerConfig');
const swaggerUi = require('swagger-ui-express')

dotenv.config();

const app = express();
app.use(express.json());

// Routes
const authRoutes = require('./src/routes/authRoutes');
const ticketRoutes = require('./src/routes/ticketRoutes');
// const customerRoutes = require('./src/routes/customerRoutes');
// const notificationRoutes = require('./src/routes/notificationRoutes');
const agentRoutes = require('./src/routes/agentRoutes');
const userRoutes = require('./src/routes/userRoutes');
// const notificationRoutes = require('./src/routes/notificationRoutes');

// Swagger UI route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));


app.use('/api', ticketRoutes);
// app.use('/api', customerRoutes);
// app.use('/api', userRoutes);
// app.use('/api', notificationRoutes);
app.use('/api', agentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

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

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});
