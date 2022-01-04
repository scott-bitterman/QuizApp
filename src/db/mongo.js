/* 
  This is a base Mongo class for generalized querying.
  It also acts as a factory for creating any number of interfaces 
  by Mongo collection. See, e.g., Quiz and User.
  
  Possible Improvements:
    * Use the mongoose node module and create Mongo Schemas.
    * Properly subclass this base class for each collection.
*/
const { ObjectId, MongoClient } = require('mongodb');
const CONSTANTS = require('../constants.js');

module.exports = class Mongo {
  constructor(collectionName) {
    const { db, username, password, connection } = CONSTANTS.mongoDB;
    const uri = `mongodb+srv://${username}:${password}${connection}`;
    this.collectionName = collectionName;
    this.db = db;
    this.client = new MongoClient(uri);
  }

  /**
   * Helper for all db queries
   * @returns Object - MongoCollection
   */
  async getCollection() {
    // console.log('Mongo Connect - ATTEMPT');
    await this.client.connect();
    console.log('Mongo connect - SUCCESS');
    const database = this.client.db(this.db);
    const collection = database.collection(this.collectionName);
    return collection;
  }

  async insertOne(input) {
    try {
      const collection = await this.getCollection();
      const response = await collection.insertOne(input);
      console.log('Mongo insertOne - SUCCESS');
      return response.insertedId.toString();     
    } finally {
      this.client.close();
    }  
  }

  async find(filter) {
    try {
      const collection = await this.getCollection();
      const response = await (await collection.find(filter).toArray()).map(({_id, ...rest}) => {
        return {id: _id.toString(), ...rest};
      }); // Convert all Mongo _id Objects to strings
      console.log('Mongo find - SUCCESS');
      return response;     
    } finally {
      this.client.close();
    }  
  }

  async deleteOne(filter) {
    try {
      const collection = await this.getCollection();
      const response = await collection.deleteOne(filter);
      console.log(`Mongo deleteOne - SUCCESS`);
      return filter._id.toString();     
    } finally {
      this.client.close();
    }  
  }  

  async updateOne(filter, update) {
    try {
      const collection = await this.getCollection();
      const response = await collection.updateOne(filter, {$set: update});
      console.log(`Mongo updateOne - SUCCESS`);
      return filter._id.toString();
    } finally {
      this.client.close();
    }  
  }  
}