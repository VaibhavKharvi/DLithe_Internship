// MongoDB Connection Module
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

let client;
let db;

async function connectToDatabase() {
  try {
    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
      console.log('Successfully connected to MongoDB');
    }
    
    db = client.db(dbName);
    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

async function getDb() {
  if (!db) {
    await connectToDatabase();
  }
  return db;
}

async function closeConnection() {
  if (client) {
    await client.close();
    console.log('MongoDB connection closed');
    client = null;
    db = null;
  }
}

module.exports = {
  connectToDatabase,
  getDb,
  closeConnection
}; 