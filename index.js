require('dotenv').config(); // ✅ Load env variables first
// server.js or app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/db');
const allRoutes = require('./src/routes/index');

const testSeriesApp = express();

// Security middleware
testSeriesApp.use(helmet());

// Enable CORS
testSeriesApp.use(cors());

// Logging middleware
testSeriesApp.use(morgan('dev'));

// Body parser middlewares
testSeriesApp.use(bodyParser.json());
testSeriesApp.use(bodyParser.urlencoded({ extended: true }));

// Routes
testSeriesApp.use('/api', allRoutes);

// Global error handler (optional)
testSeriesApp.use((err, req, res, next) => {
  console.error('Global Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Start server
const startTestSeriesServer = async () => {
  try {
    await connectDB();
    testSeriesApp.listen(3002, () =>
      console.log(`✅ Test series backend server is running on port 3002`)
    );
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startTestSeriesServer();