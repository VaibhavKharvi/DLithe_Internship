// Dependent Model
const { getDb } = require('../connection');

const COLLECTION = 'dependents';

// Dependent schema definition for validation
const dependentSchema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["employeeSSN", "name", "gender", "birthDate", "relationship"],
      properties: {
        employeeSSN: {
          bsonType: "string",
          description: "SSN of the employee this dependent is related to"
        },
        name: {
          bsonType: "string",
          description: "Name of the dependent"
        },
        gender: {
          enum: ["M", "F", "Other"],
          description: "Dependent's gender"
        },
        birthDate: {
          bsonType: "date",
          description: "Dependent's birth date"
        },
        relationship: {
          bsonType: "string",
          description: "Relationship of the dependent to the employee (e.g., spouse, child)"
        }
      }
    }
  }
};

// Create dependent collection with validation
async function createCollection() {
  const db = await getDb();
  
  // Check if collection already exists
  const collections = await db.listCollections({ name: COLLECTION }).toArray();
  if (collections.length > 0) {
    console.log(`Collection ${COLLECTION} already exists`);
    return;
  }
  
  await db.createCollection(COLLECTION, dependentSchema);
  console.log(`Collection ${COLLECTION} created with validation`);
  
  // Create indexes
  await db.collection(COLLECTION).createIndex({ "employeeSSN": 1, "name": 1 }, { unique: true });
  console.log(`Indexes created for ${COLLECTION}`);
}

// Dependent CRUD operations
async function createDependent(dependent) {
  const db = await getDb();
  return db.collection(COLLECTION).insertOne(dependent);
}

async function getDependentsByEmployee(employeeSSN) {
  const db = await getDb();
  return db.collection(COLLECTION).find({ employeeSSN }).toArray();
}

async function getDependent(employeeSSN, name) {
  const db = await getDb();
  return db.collection(COLLECTION).findOne({ employeeSSN, name });
}

async function updateDependent(employeeSSN, name, update) {
  const db = await getDb();
  return db.collection(COLLECTION).updateOne(
    { employeeSSN, name },
    { $set: update }
  );
}

async function deleteDependent(employeeSSN, name) {
  const db = await getDb();
  return db.collection(COLLECTION).deleteOne({ employeeSSN, name });
}

async function deleteAllEmployeeDependents(employeeSSN) {
  const db = await getDb();
  return db.collection(COLLECTION).deleteMany({ employeeSSN });
}

module.exports = {
  createCollection,
  createDependent,
  getDependentsByEmployee,
  getDependent,
  updateDependent,
  deleteDependent,
  deleteAllEmployeeDependents,
  dependentSchema
}; 