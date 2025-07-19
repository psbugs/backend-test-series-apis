const express = require('express');
const router = express.Router();

const userRoutes = require('./users-routes');
const testSeriesRoutes = require('./test-series-routes');
const analyticsRoutes = require("./analytics-routes")
// Mount each route module
router.use('/users', userRoutes);
router.use('/test-series', testSeriesRoutes);
router.use('/main-analytics',analyticsRoutes)
module.exports = router;