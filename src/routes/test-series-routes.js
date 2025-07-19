const express = require('express');
const router = express.Router();
const testSeriesController = require('../controllers/test-series-controller');
const uploadCSV = require('../middlewares/csvUploadMiddleware');
const auth = require('../middlewares/authMiddleware');
const permitRoles = require('../middlewares/roleMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


// Define Test Series routers
router.post('/create', authMiddleware,permitRoles(['admin','instructor']), testSeriesController.createTestSeries);
router.post('/upload', permitRoles(['admin','instructor']), uploadCSV.single('file'),testSeriesController.uploadTestSeries);
router.put('/update/:id', authMiddleware,permitRoles(['admin','instructor']), testSeriesController.updateTestSeries);
router.delete('/delete/:id', authMiddleware,permitRoles(['admin','instructor']), testSeriesController.deleteTestSeries);
router.get('/all',testSeriesController.getAllTestSeries);
router.get('/results/:testId',permitRoles(['admin','instructor']),testSeriesController.fetchAllTestResultUsingTestId);

router.get('/active',testSeriesController.getAllActiveTestSeries);
router.post('/submit',testSeriesController.learnerTestSubmit);
router.get('/result/:userId',testSeriesController.fetchLearnerResultUsingUserId);
router.post('/fetch-questions', testSeriesController.fetchQuestionsByTestId);

module.exports = router;