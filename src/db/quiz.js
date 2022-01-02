import { ObjectId } from 'mongodb';
import Mongo from './mongo.js';
const Quiz = new Mongo('quiz');

async function insert(input) {
  return await Quiz.insertOne(input);
}

async function find(id) {
  const query = id ? {_id: new ObjectId(id)} : {};
  const quizzes = await Quiz.find(query);
  return quizzes;
}

async function updateOne({id, ...update}) {
  const quizzes = await Quiz.updateOne(id, update);
  return quizzes;
}

async function deleteOne(id) {
  // console.log('in quiz db ', id)
  const quizzes = await Quiz.deleteOne(id);
  return quizzes;
}

export default {
  deleteOne,
  find,
  insert,
  updateOne,
};