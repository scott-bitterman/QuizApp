import Mongo from './mongo.js';
const Quiz = new Mongo('user');

async function insertOne({ email, password }) {
  try {
    await client.connect();
    const database = client.db('TrustLayer');
    const collection = database.collection(collectionName);

    const query = { email };
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    const update = { $set: { email, password: hash } };
    const options = { 
      upsert: true,
      new: true,
      projection: {}
     };
    const response = await collection.findOneAndUpdate(query, update, options);
    return {id: response.value._id, email};   
  } finally {
    await client.close();
  }
}

async function authenticate({ email, password }) {
  try {
    await client.connect();
    const database = client.db('TrustLayer');
    const collection = database.collection(collectionName);
  
    const query = { email };
    const user = await collection.findOne(query);
    const match = await bcrypt.compare(password, user.password);
    return match;   
  } finally {
    await client.close();
  }
}

export default {
  authenticate,
  insertOne,
};