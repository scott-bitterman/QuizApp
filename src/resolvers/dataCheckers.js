function hasExactlyFourAnswers(arr) {
  return 4 === arr.length;
}

function onlyOneAnswerIsCorrect(answers) {
  const correctAnswers = answers.find(answer => answer.correct);
  return 1 === correctAnswers.length;
}

function questionIsValid({answers}) {
  return hasExactlyFourAnswers(answers) && onlyOneAnswerIsCorrect(answers);
}

function validateQuestions(quiz) {
  quiz.questions.forEach(questionIsValid);
}
