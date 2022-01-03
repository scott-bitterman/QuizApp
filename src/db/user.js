const Mongo = require('./mongo.js');
const bcrypt = require('bcrypt');
const User = new Mongo('user');

async function authenticate({ email, password }) {
  const query = { email };
  const user = await User.find(query);
  const match = await bcrypt.compare(password, user[0].password);
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
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  const query = { email, password: hash };
  const userId = await User.insertOne(query);
  return userId;   
}

async function updateOne({id, ...update}) {
  const userId = await User.updateOne(id, update);
  return userId;
}

module.exports = {
  authenticate,
  deleteOne,
  find,
  insertOne,
  updateOne,
};