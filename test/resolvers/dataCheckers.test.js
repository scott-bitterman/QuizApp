// Unit tests
const { validateQuestions } = require('../../src/resolvers/dataCheckers.js');

/* ============================================================================= 
Quiz mock
============================================================================= */ 
const quiz = {
	name: 'Test Quiz',
	questions: [
		{
			text: 'What is the result of adding 2 + 2?',
			answers: [
				{
					text: '1'
				},
				{
					text: '2'
				},
				{
					text: '3'
				},
				{
					text: '4',
					correct: true
				},
			]
		},
		{
			text: 'What is the most abundant element in the universe?',
			answers: [
				{
					text: 'Oxygen',
					correct: false
				},
				{
					text: 'Iron',
					correct: false
				},
				{
					text: 'Hydrogen',
					correct: true
				},
				{
					text: 'Helium',
					correct: false
				},
			]
	
		},
	]
};

/* ============================================================================= 
Happy Paths :)
============================================================================= */ 
test('Questions have exactly four answers and exactly one of them is correct', () => {
  	expect(validateQuestions(quiz)).toBe(true);
});

/* ============================================================================= 
Unhappy Paths :(
============================================================================= */ 
test('Questions that do not have exactly four answers throw an error', () => {
	const quizCopy = JSON.parse(JSON.stringify(quiz));
	// Remove an answer
	delete quizCopy.questions[0].answers[3];  
	expect(() => validateQuestions(quizCopy)).toThrow();
});

test('Questions that have no correct answers throw an error', () => {
	const quizCopy = JSON.parse(JSON.stringify(quiz));
	// Remove the only correct answer
	quizCopy.questions[0].answers[3].correct = false; 
	expect(() => validateQuestions(quizCopy)).toThrow();
});

test('Questions that have more than one correct answer throw an error', () => {
	const quizCopy = JSON.parse(JSON.stringify(quiz));
	// Set more than one answer to correct
	quizCopy.questions[0].answers[2].correct = true;  
	expect(() => validateQuestions(quizCopy)).toThrow();
});