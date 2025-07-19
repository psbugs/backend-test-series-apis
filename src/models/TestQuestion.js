// models/TestQuestion.js
const mongoose = require('mongoose');

const TestQuestionSchema = new mongoose.Schema({
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TestSeries',
    // required: true
    default:null
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctOption: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  type: {
    type: String,
    enum: ['MCQ', 'TF', 'FIB'],
    required: true
  },
  topic: {
    type: String
  }
});

module.exports = mongoose.model('TestQuestion', TestQuestionSchema);
