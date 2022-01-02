import jwt from 'jsonwebtoken';
import User from '../db/user.js';
import Quiz from '../db/quiz.js';
import CONSTANTS from '../constants.js';

export default {
  // Basic Existence
  hello: () => {
    return 'Howdy world!';
  },

  // User CRUD
  authenticate: async ({input}) => {
    const authenticated = await User.authenticate(input);
    if (authenticated) {
      return jwt.sign({ email: input.email }, CONSTANTS.jwt.secret, { expiresIn: 60 * 60 });
    } else {
      return new Error('Authentication failed');
    }
  },
  userCreate: async ({input}) => {
    const user = await User.upsert(input);
    const { id, email } = user;
    return { id, email };
  },

  // Quiz CRUD
  quizCreate: async ({input}) => {
    const quiz = await Quiz.insert(input);
    return quiz;
  },
  quizDeleteOne: async ({input}) => {
    console.log(input)
    const quiz = await Quiz.deleteOne(input);
    return quiz;
  },
  quizFind: async ({input}) => {
    console.log('quizFind', {input});
    const quizes = await Quiz.find(input);
    return quizes;
  },
  quizUpdate: async ({input}) => {
    const quiz = await Quiz.updateOne(input);
    return quiz;
  },

};