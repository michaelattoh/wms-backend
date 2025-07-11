const express = require('express');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API routes
const bookingsRoutes = require('./routes/bookings.routes');
app.use('/api/bookings', bookingsRoutes);

const userRoutes = require('./routes/userRoutes');
console.log("user routes loaded");
app.use('/api/users', userRoutes);

app.use('/api/event', require('./routes/guestsTables.routes'));
app.use('/api/notifications', require('./routes/notifications.routes'));
app.use('/api/ai-plans', require('./routes/aiPlans.routes'));
app.use('/api/auth', require('./routes/auth.routes'));

const vendorRoutes = require('./routes/vendorRoutes');
app.use('/api/vendors', vendorRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('WMS API is running');
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
})