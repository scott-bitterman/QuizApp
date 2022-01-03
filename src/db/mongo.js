/* 
  Possible Improvements:
    * Use the mongoose node module and create Mongo Schemas.
    * Properly subclass this base class for each collection
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
    console.log('Getting Mongo Collection - ATTEMPT');
    await this.client.connect();
    console.log('Getting Mongo Collection - SUCCESS');
    const database = this.client.db(this.db);
    const collection = database.collection(this.collectionName);
    return collection;
  }

  async insertOne(input) {
    try {
      const collection = await this.getCollection();
      console.log('Mongo insertOne - ATTEMPT');
      const response = await collection.insertOne(input);
      console.log('Mongo insertOne - SUCCESS');
      return response.insertedId.toString();     
    } finally {
      this.client.close();
    }  
  }

  async find(query) {
    try {
      const collection = await this.getCollection();
      console.log('Mongo find - ATTEMPT');
      const response = await (await collection.find(query).toArray()).map(({_id, ...rest}) => {
        return {id: _id.toString(), ...rest};
      });
      console.log('Mongo find - SUCCESS');
      return response;     
    } finally {
      this.client.close();
    }  
  }

  async deleteOne(idStr) {
    try {
      const collection = await this.getCollection();
      const filter = { _id: new ObjectId(idStr) };
      console.log(`Mongo deleteOne id ${idStr} - ATTEMPT`);
      const response = await collection.deleteOne(filter);
      console.log(`Mongo deleteOne id ${idStr} - SUCCESS`);
      return idStr;     
    } finally {
      this.client.close();
    }  
  }  

  async updateOne(idStr, update) {
    try {
      const collection = await this.getCollection();
      const filter = { _id: new ObjectId(idStr) };
      console.log(`Mongo updateOne id ${idStr} - ATTEMPT`);
      const response = await collection.updateOne(filter, {$set: update});
      console.log(`Mongo updateOne id ${idStr} - SUCCESS`);
      return idStr;     
    } finally {
      this.client.close();
    }  
  }  
}