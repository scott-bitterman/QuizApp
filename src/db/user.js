const { ObjectId } = require('mongodb');
const Mongo = require('./mongo.js');
const bcrypt = require('bcrypt');
const User = new Mongo('user');

async function authenticate({ email, password }) {
  const query = { email };
  const users = await User.find(query);
  const user = users[0];
  const authenticated = user && await bcrypt.compare(password, user.password);
  return {authenticated, ...user};   
}

async function deleteOne(idStr) {
  const filter = createFilter(idStr);
  const userId = await User.deleteOne(filter);
  return userId;
}

async function find(idStr) {
  const filter = createFilter(idStr);
  const users = await User.find(filter);
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
  const filter = createFilter(id);
  const userId = await User.updateOne(filter, update);
  return userId;
}

//-----------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------
function createFilter(idStr) {
  const filter = {};
  if (idStr) {
    filter._id = new ObjectId(idStr);
  }
  return filter;
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