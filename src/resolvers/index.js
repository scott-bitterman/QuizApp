import jwt from 'jsonwebtoken';
import User from '../db/user.js';
import Quiz from '../db/quiz.js';
import CONSTANTS from '../constants.js';

export default {
  // EXIST!
  hello: () => {
    return 'Hello world!';
  },

  // USER CRUD
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

  // QUIZ CRUD
  quizCreate: async ({input}) => {
    const quiz = await Quiz.insert(input);
    return quiz;
  },
  quizDelete: async ({input}) => {
    console.log(input)
    const quiz = await Quiz.remove(input);
    return quiz;
  },
  quizFind: async ({input}) => {
    console.log(input)
    const quizes = await Quiz.find(input);
    return quizes;
  },
  quizUpdate: async ({input}) => {
    const quiz = await Quiz.update(input);
    return quiz;
  },

};