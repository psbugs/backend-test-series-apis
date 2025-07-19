const testSeriesService = require('../services/testSeriesService');
const sanitizeCSV = require('../utils/sanitizeCSV');

async function getAllTestSeries(req, res) {
  try {
    const data = await testSeriesService.getAllTestSeries();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

async function createTestSeries(req, res) {
  try {
    const response = await testSeriesService.createTestSeries(req.body);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function uploadTestSeries(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No CSV file uploaded' });
    }
    const sanitizedData = await sanitizeCSV(req.file.path);
    const savedQuestions = await testSeriesService.bulkUploadQuestions(sanitizedData, req?.body?.testId);

    res.status(200).json({
      message: 'CSV uploaded, sanitized, and saved successfully',
      data: savedQuestions
    });
  } catch (err) {
    res.status(500).json({ message: 'Error processing CSV', error: err.message });
  }
}

async function getAllActiveTestSeries(req, res) {
  try {
    const data = await testSeriesService.getActiveTestSeries();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// this will be helpful when user is submitting their respective test
async function learnerTestSubmit(req, res) {
  try {
    const { userId, testId, answers } = req.body;

    
    const result = await testSeriesService.submitTestAttempt(userId, testId, answers);
    res.status(200).json({ message: 'Test submitted successfully', result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function fetchAllTestResultUsingTestId(req, res) {
  try {
    const { testId } = req.params;
    const results = await testSeriesService.getResultsByTestId(testId);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function fetchLearnerResultUsingUserId(req, res) {
  try {
    const { userId } = req.params;
    const result = await testSeriesService.getResultsByUserId(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function updateTestSeries(req, res) {
  try {
    const { id } = req.params;
    const updated = await testSeriesService.updateTestSeriesById(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Test Series not found' });
    }
    res.status(200).json({ message: 'Test Series updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function deleteTestSeries(req, res) {
  try {
    const { id } = req.params;
    const deleted = await testSeriesService.deleteTestSeriesById(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Test Series not found or already deleted' });
    }
    res.status(200).json({ message: 'Test Series deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function fetchQuestionsByTestId(req, res) {
  try {
    const { testId, questionLimit } = req.body;

    if (!testId || !questionLimit) {
      return res.status(400).json({ message: 'testId and questionLimit are required' });
    }

    const questions = await testSeriesService.getQuestionsByTestId(testId, parseInt(questionLimit));

    res.status(200).json({ questions });
  } catch (err) {
    console.error('Error fetching questions:', err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  getAllTestSeries,
  createTestSeries,
  uploadTestSeries,
  getAllActiveTestSeries,
  learnerTestSubmit,
  fetchAllTestResultUsingTestId,
  fetchLearnerResultUsingUserId,
  updateTestSeries,
  deleteTestSeries,
  fetchQuestionsByTestId
};
