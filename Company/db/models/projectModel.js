// Project Model
const { getDb } = require('../connection');

const COLLECTION = 'projects';

// Project schema definition for validation
const projectSchema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["projectId", "projectName", "location", "deptId"],
      properties: {
        projectId: {
          bsonType: "string",
          description: "Unique identifier for the project"
        },
        projectName: {
          bsonType: "string",
          description: "Name of the project"
        },
        location: {
          bsonType: "string",
          description: "Location of the project"
        },
        deptId: {
          bsonType: "string",
          description: "ID of the department controlling this project"
        }
      }
    }
  }
};

// Create project collection with validation
async function createCollection() {
  const db = await getDb();
  
  // Check if collection already exists
  const collections = await db.listCollections({ name: COLLECTION }).toArray();
  if (collections.length > 0) {
    console.log(`Collection ${COLLECTION} already exists`);
    return;
  }
  
  await db.createCollection(COLLECTION, projectSchema);
  console.log(`Collection ${COLLECTION} created with validation`);
  
  // Create indexes
  await db.collection(COLLECTION).createIndex({ "projectId": 1 }, { unique: true });
  await db.collection(COLLECTION).createIndex({ "deptId": 1 });
  console.log(`Indexes created for ${COLLECTION}`);
}

// Project CRUD operations
async function createProject(project) {
  const db = await getDb();
  return db.collection(COLLECTION).insertOne(project);
}

async function getProjectById(projectId) {
  const db = await getDb();
  return db.collection(COLLECTION).findOne({ projectId });
}

async function getAllProjects() {
  const db = await getDb();
  return db.collection(COLLECTION).find().toArray();
}

async function getProjectsByDepartment(deptId) {
  const db = await getDb();
  return db.collection(COLLECTION).find({ deptId }).toArray();
}

async function updateProject(projectId, update) {
  const db = await getDb();
  return db.collection(COLLECTION).updateOne(
    { projectId },
    { $set: update }
  );
}

async function deleteProject(projectId) {
  const db = await getDb();
  return db.collection(COLLECTION).deleteOne({ projectId });
}

module.exports = {
  createCollection,
  createProject,
  getProjectById,
  getAllProjects,
  getProjectsByDepartment,
  updateProject,
  deleteProject,
  projectSchema
}; 