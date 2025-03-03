require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./models');

// Middleware to parse JSON
app.use(express.json());

// Import routes
const authRoutes = require('./routes/authRoutes');
const fundRoutes = require('./routes/fundRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');

// Set up endpoints
app.use('/api/auth', authRoutes);
app.use('/api/funds', fundRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Simple root route
app.get('/', (req, res) => {
  res.send('Mutual Fund Broker API is running');
});

// Sync database and start the server
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    // Start the hourly portfolio updater
    const portfolioUpdater = require('./services/portfolioUpdater');
    portfolioUpdater.start();
  });
});
