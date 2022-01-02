/* 
  Possible Improvements:
    Use the mongoose node module and create Mongo Schemas.
    Properly subclass this base class for each collection
*/
import { ObjectId, MongoClient } from 'mongodb';
import CONSTANTS from '../constants.js';

export default class Mongo {
  constructor(collectionName) {
    const { username, password, connection } = CONSTANTS.mongoDB;
    const uri = `mongodb+srv://${username}:${password}${connection}`;
    this.collectionName = collectionName;
    this.client = new MongoClient(uri);
  }

  async getCollection() {
    await this.client.connect();
    const database = this.client.db('TrustLayer');
    const collection = database.collection(this.collectionName);
    return collection;
  }

  async insertOne(input) {
    try {
      const collection = await this.getCollection();
      const response = await collection.insertOne(input);
      return response.insertedId;     
    } finally {
      this.client.close();
    }  
  }

  async find(query) {
    // console.log(query)
    try {
      const collection = await this.getCollection();
      const response = await (await collection.find(query).toArray()).map(({_id, ...rest}) => {
        return {id: _id.toString(), ...rest};
      });
      return response;     
    } finally {
      this.client.close();
    }  
  }

  async deleteOne(idStr) {
    const filter = { _id: new ObjectId(idStr) };
    try {
      const collection = await this.getCollection();
      const response = await collection.deleteOne(filter);
      return idStr;     
    } finally {
      this.client.close();
    }  
  }  

  async updateOne(idStr, update) {
    console.log('In updateOne', {idStr, update});
    const filter = { _id: new ObjectId(idStr) };
    try {
      const collection = await this.getCollection();
      const response = await collection.updateOne(filter, {$set: update});
      return idStr;     
    } finally {
      this.client.close();
    }  
  }  
}