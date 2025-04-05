// Employee Model
const { getDb } = require('../connection');

const COLLECTION = 'employees';

// Employee schema definition for validation
const employeeSchema = {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["ssn", "firstName", "lastName", "address", "salary", "gender", "birthDate", "deptId"],
      properties: {
        ssn: {
          bsonType: "string",
          description: "Social Security Number, unique identifier for the employee"
        },
        firstName: {
          bsonType: "string",
          description: "First name of the employee"
        },
        lastName: {
          bsonType: "string",
          description: "Last name of the employee"
        },
        address: {
          bsonType: "object",
          required: ["street", "city", "state", "zipCode"],
          properties: {
            street: { bsonType: "string" },
            city: { bsonType: "string" },
            state: { bsonType: "string" },
            zipCode: { bsonType: "string" }
          }
        },
        salary: {
          bsonType: ["double", "int"],
          description: "Employee's salary"
        },
        gender: {
          enum: ["M", "F", "Other"],
          description: "Employee's gender"
        },
        birthDate: {
          bsonType: "date",
          description: "Employee's birth date"
        },
        deptId: {
          bsonType: "string",
          description: "ID of the department the employee is assigned to"
        },
        supervisorSSN: {
          bsonType: ["string", "null"],
          description: "SSN of the employee's direct supervisor"
        },
        projects: {
          bsonType: "array",
          description: "Projects the employee works on",
          items: {
            bsonType: "object",
            required: ["projectId", "hoursPerWeek"],
            properties: {
              projectId: { bsonType: "string" },
              hoursPerWeek: { bsonType: ["double", "int"] }
            }
          }
        }
      }
    }
  }
};

// Create employee collection with validation
async function createCollection() {
  const db = await getDb();
  
  // Check if collection already exists
  const collections = await db.listCollections({ name: COLLECTION }).toArray();
  if (collections.length > 0) {
    console.log(`Collection ${COLLECTION} already exists`);
    return;
  }
  
  await db.createCollection(COLLECTION, employeeSchema);
  console.log(`Collection ${COLLECTION} created with validation`);
  
  // Create indexes
  await db.collection(COLLECTION).createIndex({ "ssn": 1 }, { unique: true });
  await db.collection(COLLECTION).createIndex({ "deptId": 1 });
  await db.collection(COLLECTION).createIndex({ "supervisorSSN": 1 });
  await db.collection(COLLECTION).createIndex({ "projects.projectId": 1 });
  console.log(`Indexes created for ${COLLECTION}`);
}

// Employee CRUD operations
async function createEmployee(employee) {
  const db = await getDb();
  return db.collection(COLLECTION).insertOne(employee);
}

async function getEmployeeBySSN(ssn) {
  const db = await getDb();
  return db.collection(COLLECTION).findOne({ ssn });
}

async function getAllEmployees() {
  const db = await getDb();
  return db.collection(COLLECTION).find().toArray();
}

async function getEmployeesByDepartment(deptId) {
  const db = await getDb();
  return db.collection(COLLECTION).find({ deptId }).toArray();
}

async function getEmployeesBySupervisor(supervisorSSN) {
  const db = await getDb();
  return db.collection(COLLECTION).find({ supervisorSSN }).toArray();
}

async function updateEmployee(ssn, update) {
  const db = await getDb();
  return db.collection(COLLECTION).updateOne(
    { ssn },
    { $set: update }
  );
}

async function addProjectToEmployee(ssn, projectData) {
  const db = await getDb();
  return db.collection(COLLECTION).updateOne(
    { ssn },
    { $push: { projects: projectData } }
  );
}

async function updateEmployeeProject(ssn, projectId, hoursPerWeek) {
  const db = await getDb();
  return db.collection(COLLECTION).updateOne(
    { ssn, "projects.projectId": projectId },
    { $set: { "projects.$.hoursPerWeek": hoursPerWeek } }
  );
}

async function removeProjectFromEmployee(ssn, projectId) {
  const db = await getDb();
  return db.collection(COLLECTION).updateOne(
    { ssn },
    { $pull: { projects: { projectId } } }
  );
}

async function deleteEmployee(ssn) {
  const db = await getDb();
  return db.collection(COLLECTION).deleteOne({ ssn });
}

module.exports = {
  createCollection,
  createEmployee,
  getEmployeeBySSN,
  getAllEmployees,
  getEmployeesByDepartment,
  getEmployeesBySupervisor,
  updateEmployee,
  addProjectToEmployee,
  updateEmployeeProject,
  removeProjectFromEmployee,
  deleteEmployee,
  employeeSchema
}; 