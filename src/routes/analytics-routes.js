const express = require('express');
const router = express.Router();
const { getAnalytics } = require('../controllers/analytics-controller');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/analytics', authMiddleware, getAnalytics);

module.exports = router;
