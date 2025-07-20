const TestAttempt = require('../models/TestAttempt');
const User = require('../models/User');

const getAnalytics = async (req, res) => {
  try {
    const submissions = await TestAttempt.find().populate('userId', 'name email');

    // Total number of unique participants
    const participantsSet = new Set(submissions.map(s => s.userId?._id?.toString()));
    const participants = participantsSet.size;

    // Average score
    const totalScore = submissions.reduce((acc, cur) => acc + cur.score, 0);
    const averageScore = submissions.length ? (totalScore / submissions.length).toFixed(2) : 0;

    // Top 10 performers
    const sortedSubmissions = submissions
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(s => ({
        name: s.user?.name,
        email: s.user?.email,
        score: s.score
      }));

    // Score distribution
    const scoreDistribution = Array(10).fill(0); // 0-10, 11-20, ..., 91-100

    submissions.forEach(({ score }) => {
      const index = Math.min(Math.floor(score / 10), 9);
      scoreDistribution[index]++;
    });

    const scoreBuckets = scoreDistribution.map((count, idx) => ({
      range: `${idx * 10}-${idx * 10 + 9}`,
      count
    }));

    res.json({
      message:'Analytics data is fetched successfully',
      participants,
      averageScore,
      topPerformers: sortedSubmissions,
      scoreDistribution: scoreBuckets
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while generating analytics' });
  }
};

module.exports = { getAnalytics };