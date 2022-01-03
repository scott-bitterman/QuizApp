function validateQuestions(quiz) {
  if (quiz.questions.map(questionIsValid)) {
    return true;
  }

  function hasExactlyFourAnswers(arr) {
    return 4 === arr.length;
  }
  
  function questionIsValid(question) {
    const { text, answers } = question;
    if (hasExactlyFourAnswers(answers)) {
    } else {
      throw new Error(`Quiz question [${text}] must have exactly four answers.`)
    }

    const correctAnswers = answers.filter(answer => answer.correct);
    if (1 === correctAnswers.length) {
    } else {
      throw new Error(`Quiz question [${text}] must have exactly one correct answer. Instead it has ${correctAnswers.length} correct answers.`)
    }
    return true;
  }
}

module.exports = {
  validateQuestions,
};