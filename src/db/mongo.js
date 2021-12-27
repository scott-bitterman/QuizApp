/* 
    In a more robust system, we might use the mongoose node module
    and create Mongo Schemas.
*/

import { ObjectId, MongoClient } from 'mongodb';
import CONSTANTS from '../constants.js';
const { username, password, connection } = CONSTANTS.mongoDB;
const uri = `mongodb+srv://${username}:${password}${connection}`;
const client = new MongoClient(uri);
console.log({uri})

async function collection(name) {
  try {
    await client.connect();
    const database = client.db('TrustLayer');
    const collection = database.collection(name);
    return collection;
  } finally {
    // Ensures client will close upon success or error
    await client.close();
  }
}

export default {
  collection
};