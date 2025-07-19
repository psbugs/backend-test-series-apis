const TestSeries = require('../models/TestSeries');
const TestQuestion = require('../models/TestQuestion');
const TestAttempt = require('../models/TestAttempt');
const { evaluate } = require('../utils/evaluationEngine');
const mongoose = require('mongoose');

// 1. Create new test
async function createTestSeries(data) {
  const test = new TestSeries(data);
  const testSaveRes = await test.save();
  return {
    status:1,
    message:'Test series is created successfully'
  }
}

// 2. Bulk upload questions from sanitized CSV
async function bulkUploadQuestions(parsedQuestions, testId) {
  const questionsToSave = parsedQuestions.map((q) => ({
    testId,
    question: q.Question,
    options: [q.Option1, q.Option2, q.Option3, q.Option4],
    correctOption: parseInt(q.CorrectOption),
    difficulty: q.Difficulty,
    type: q['Type (MCQ/TF/FIB)'],
    topic: q.Topic
  }));

  // Optional: Check for duplicates here if required

  return await TestQuestion.insertMany(questionsToSave);
}

// 3. Get all tests (admin)
async function getAllTestSeries() {
  return await TestSeries.find().sort({ createdAt: -1 });
}

// 4. Get only active tests (for learners)
async function getActiveTestSeries() {
  const now = new Date();
  return await TestSeries.find({ startDate: { $lte: now }, endDate: { $gte: now } });
}

// 5. Submit test attempt
async function submitTestAttempt(userId, testId, answers) {
  
  const normalizedAnswers = Array.isArray(answers) ? answers : normalizeAnswers(answers);

  const questions = await TestQuestion.find({ testId });

  const { score, result: evaluatedAnswers } = evaluate(questions, normalizedAnswers);

  const attempt = new TestAttempt({
    userId,
    testId,
    score,
    answers: evaluatedAnswers,
    submittedAt: new Date()
  });

  await attempt.save();
  return { score, answers: evaluatedAnswers };
}

// 6. Get all attempts for a specific test
async function getResultsByTestId(testId) {
  return await TestAttempt.find({ testId }).populate('testId').populate('answers.questionId');
}

// 7. Get a learner's test results
async function getResultsByUserId(userId) {
  return await TestAttempt.find({ userId }).populate('testId').populate('answers.questionId');
};

async function updateTestSeriesById(id, updateData) {
  return await TestSeries.findByIdAndUpdate(id, updateData, { new: true });
}

async function deleteTestSeriesById(id) {
  return await TestSeries.findByIdAndDelete(id);
};

async function getQuestionsByTestId(testId, limit) {
  console.log('testId', testId, limit);
  return await TestQuestion.aggregate([
    {
      $match: {
        testId: new mongoose.Types.ObjectId(testId) // ✅ Fix here
      }
    },
    {
      $sample: {
        size: limit
      }
    }
  ]);
}
function normalizeAnswers(answerObj) {
  return Object.entries(answerObj).map(([questionId, selectedOption]) => ({
    questionId,
    selectedOption,
    timeSpent: 0 // Default if not provided
  }));
}


module.exports = {
  createTestSeries,
  bulkUploadQuestions,
  getAllTestSeries,
  getActiveTestSeries,
  submitTestAttempt,
  getResultsByTestId,
  getResultsByUserId,
  updateTestSeriesById,
  deleteTestSeriesById,
  getQuestionsByTestId
};