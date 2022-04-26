const jwt = require('jsonwebtoken');
const User = require('../db/user.js');
const Quiz = require('../db/quiz.js');
const CONSTANTS = require('../constants.js');
const { validateQuestions } = require('./dataCheckers.js');

module.exports = {
  //-----------------------------------------------------------------------
  // Howdy World
  //-----------------------------------------------------------------------
  hi: () => {
    return 'Howdy world. I am alive.';
  },

  //-----------------------------------------------------------------------
  // User CRUD
  //-----------------------------------------------------------------------
  authenticate: async ({input}) => {
    const user = await User.authenticate(input);
    const { authenticated, email, id } = user;
    if (authenticated) {
      console.log('Authentication success:', email);
      // Symmetric encryption
      // Expires in 1 hour
      return jwt.sign({ email, id }, CONSTANTS.jwt.secret, { expiresIn: 60 * 60 });
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
  quizCreate: async ({input}, { user }) => {
    validateQuestions(input);
    const quiz = await Quiz.insertOne(input, user);
    return quiz;
  },
  quizDelete: async ({input}, { user }) => {
    const quiz = await Quiz.deleteOne(input, user);
    return quiz;
  },
  quizFind: async ({input}, { user }) => {
    const quizes = await Quiz.find(input, user);
    return quizes;
  },
  quizUpdate: async ({input}, { user }) => {
    validateQuestions(input);
    const quiz = await Quiz.updateOne(input, user);
    return quiz;
  },

};