exports.evaluate = (questions, answers) => {
  let score = 0;

  const results = answers.map((ans) => {
    const question = questions.find(q => q._id.toString() === ans.questionId);
    const isCorrect = question && question.correctOption === ans.selectedOption;

    if (isCorrect) score += 1;

    return {
      questionId: ans.questionId,
      selectedOption: ans.selectedOption,
      correct: isCorrect,
      timeSpent: ans.timeSpent
    };
  });

  return { score, result: results };
};
