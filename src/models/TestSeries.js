// models/TestSeries.js
const mongoose = require('mongoose');

const TestSeriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default:null
  },
  audience: {
    type: String,
    enum: ['course', 'public'],
    default: 'public'
  },
  visibleTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  timeLimit: {
    type: Number // in minutes or seconds as per your logic
  },
  totalQuestions: {
    type: Number
  },
  skillTag: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TestSeries', TestSeriesSchema);