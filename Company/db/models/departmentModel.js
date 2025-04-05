// Department Model
const { getDb } = require('../connection');

const COLLECTION = 'departments';

// Department schema definition for validation
const departmentSchema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["deptId", "deptName", "managerSSN", "managerStartDate", "locations"],
      properties: {
        deptId: {
          bsonType: "string",
          description: "Unique identifier for the department"
        },
        deptName: {
          bsonType: "string",
          description: "Name of the department"
        },
        managerSSN: {
          bsonType: "string",
          description: "SSN of the employee managing this department"
        },
        managerStartDate: {
          bsonType: "date",
          description: "Date when the manager started managing this department"
        },
        locations: {
          bsonType: "array",
          description: "List of department locations",
          items: {
            bsonType: "string"
          }
        }
      }
    }
  }
};

// Create department collection with validation
async function createCollection() {
  const db = await getDb();
  
  // Check if collection already exists
  const collections = await db.listCollections({ name: COLLECTION }).toArray();
  if (collections.length > 0) {
    console.log(`Collection ${COLLECTION} already exists`);
    return;
  }
  
  await db.createCollection(COLLECTION, departmentSchema);
  console.log(`Collection ${COLLECTION} created with validation`);
  
  // Create indexes
  await db.collection(COLLECTION).createIndex({ "deptId": 1 }, { unique: true });
  await db.collection(COLLECTION).createIndex({ "managerSSN": 1 });
  console.log(`Indexes created for ${COLLECTION}`);
}

// Department CRUD operations
async function createDepartment(department) {
  const db = await getDb();
  return db.collection(COLLECTION).insertOne(department);
}

async function getDepartmentById(deptId) {
  const db = await getDb();
  return db.collection(COLLECTION).findOne({ deptId });
}

async function getAllDepartments() {
  const db = await getDb();
  return db.collection(COLLECTION).find().toArray();
}

async function updateDepartment(deptId, update) {
  const db = await getDb();
  return db.collection(COLLECTION).updateOne(
    { deptId },
    { $set: update }
  );
}

async function deleteDepartment(deptId) {
  const db = await getDb();
  return db.collection(COLLECTION).deleteOne({ deptId });
}

module.exports = {
  createCollection,
  createDepartment,
  getDepartmentById,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
  departmentSchema
}; 