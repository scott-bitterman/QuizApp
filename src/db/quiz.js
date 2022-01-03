import { responsePathAsArray } from 'graphql';
import { ObjectId } from 'mongodb';
import Mongo from './mongo.js';
const Quiz = new Mongo('quiz');

async function deleteOne(id) {
  // console.log('in quiz db ', id)
  const quizId = await Quiz.deleteOne(id);
  return quizId;
}

async function find(id) {
  const query = id ? {_id: new ObjectId(id)} : {};
  const quizzes = await Quiz.find(query);
  return quizzes;
}

async function insertOne(input) {
  const quizId = await Quiz.insertOne(input);
  return quizId;
}

async function updateOne({id, ...update}) {
  const quizId = await Quiz.updateOne(id, update);
  return quizId;
}

export default {
  deleteOne,
  find,
  insertOne,
  updateOne,
};