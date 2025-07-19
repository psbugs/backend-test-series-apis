// models/TestAttempt.js
const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TestQuestion',
    required: true
  },
  selectedOption: {
    type: String
  },
  correct: {
    type: Boolean,
    required: true
  },
  timeSpent: {
    type: Number // in seconds
  }
}, { _id: false });

const TestAttemptSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TestSeries',
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  score: {
    type: Number,
    required: true
  },
  answers: [AnswerSchema]
});

module.exports = mongoose.model('TestAttempt', TestAttemptSchema);