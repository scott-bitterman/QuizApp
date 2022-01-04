const { ObjectId } = require('mongodb');
const Mongo = require('./mongo.js');
const Quiz = new Mongo('quiz');

async function deleteOne(idStr, user) {
  const filter = createFilter(idStr, user);
  await checkAccess(filter);
  const quizId = await Quiz.deleteOne(filter);
  return quizId;
}

async function find(idStr, user) {
  const filter = createFilter(idStr, user);
  const quizzes = await Quiz.find(filter);
  return quizzes;
}

async function insertOne(input, user) {
  // Add createdBy property
  input = {createdBy: user.id, ... input};
  const quizId = await Quiz.insertOne(input);
  return quizId;
}

async function updateOne(idStr, user) {
  const filter = createFilter(idStr, user);
  await checkAccess(filter);
  const quizId = await Quiz.updateOne(id, update);
  return quizId;
}

//-----------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------
function createFilter(idStr, user) {
  const filter = {createdBy: user.id};
  if (idStr) {
    filter._id = new ObjectId(idStr);
  }
  return filter;
}

async function checkAccess(filter) {
  const access = await Quiz.find(filter);
  // If user and id don't match anything, then operation is denied.
  if (0 === access.length) {
    throw new Error('Either the id you specified does not exist or you do not have permission to access it.');
  }
}

module.exports = {
  deleteOne,
  find,
  insertOne,
  updateOne,
};