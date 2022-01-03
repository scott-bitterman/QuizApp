import jwt from 'jsonwebtoken';
import User from '../db/user.js';
import Quiz from '../db/quiz.js';
import CONSTANTS from '../constants.js';

export default {
  //-----------------------------------------------------------------------
  // Health Check
  //-----------------------------------------------------------------------
  hi: () => {
    return 'Howdy world. I am alive.';
  },

  //-----------------------------------------------------------------------
  // User CRUD
  //-----------------------------------------------------------------------
  authenticate: async ({input}) => {
    const authenticated = await User.authenticate(input);
    if (authenticated) {
      return jwt.sign({ email: input.email }, CONSTANTS.jwt.secret, { expiresIn: 60 * 60 });
    } else {
      return new Error('Authentication failed');
    }
  },
  userCreate: async ({input}) => {
    const user = await User.insertOne(input);
    return user;
  },
  userDelete: async ({input}) => {
    const user = await User.deleteOne(input);
    return user;
  },
  userFind: async ({input}) => {
    const user = await User.find(input);
    return user;
  },
  userUpdate: async ({input}) => {
    const user = await User.updateOne(input);
    return user;
  },

  //-----------------------------------------------------------------------
  // Quiz CRUD
  //-----------------------------------------------------------------------
  quizCreate: async ({input}) => {
    const quiz = await Quiz.insertOne(input);
    return quiz;
  },
  quizDelete: async ({input}) => {
    const quiz = await Quiz.deleteOne(input);
    return quiz;
  },
  quizFind: async ({input}) => {
    const quizes = await Quiz.find(input);
    return quizes;
  },
  quizUpdate: async ({input}) => {
    const quiz = await Quiz.updateOne(input);
    return quiz;
  },

};