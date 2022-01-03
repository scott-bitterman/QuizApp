const { ObjectId } = require('mongodb');
const Mongo = require('./mongo.js');
const bcrypt = require('bcrypt');
const User = new Mongo('user');

async function authenticate({ email, password }) {
  const query = { email };
  const user = await User.find(query);
  const match = user[0] && await bcrypt.compare(password, user[0].password);
  return match;   
}

async function deleteOne(id) {
  const userId = await User.deleteOne(id);
  return userId;
}

async function find(id) {
  const query = id ? {_id: new ObjectId(id)} : {};
  const users = await User.find(query);
  return users;
}

async function insertOne({ email, password }) {
  const users = await User.find({ email });
  if (users.length) {
    throw new Error('That user already exists.');
  }
  const insert = { email, password: await encryptPassword(password) };
  const userId = await User.insertOne(insert);
  return userId;   
}

async function updateOne({id, email, password}) {
  const update = password ? { email, password: await encryptPassword(password)} : { email };
  const userId = await User.updateOne(id, update);
  return userId;
}

async function encryptPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

module.exports = {
  authenticate,
  deleteOne,
  find,
  insertOne,
  updateOne,
};