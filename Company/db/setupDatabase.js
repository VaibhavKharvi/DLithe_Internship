// Database Setup Script
const { connectToDatabase, closeConnection } = require('./connection');
const departmentModel = require('./models/departmentModel');
const projectModel = require('./models/projectModel');
const employeeModel = require('./models/employeeModel');
const dependentModel = require('./models/dependentModel');

// Sample data
const sampleDepartments = [
  {
    deptId: "D001",
    deptName: "Engineering",
    managerSSN: "123-45-6789",
    managerStartDate: new Date("2020-01-15"),
    locations: ["New York", "San Francisco"]
  },
  {
    deptId: "D002",
    deptName: "Marketing",
    managerSSN: "987-65-4321",
    managerStartDate: new Date("2019-03-01"),
    locations: ["Chicago", "Miami"]
  }
];

const sampleProjects = [
  {
    projectId: "P001",
    projectName: "Client Portal",
    location: "New York",
    deptId: "D001"
  },
  {
    projectId: "P002",
    projectName: "Mobile App",
    location: "San Francisco",
    deptId: "D001"
  },
  {
    projectId: "P003",
    projectName: "Marketing Campaign",
    location: "Chicago",
    deptId: "D002"
  }
];

const sampleEmployees = [
  {
    ssn: "123-45-6789",
    firstName: "John",
    lastName: "Doe",
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001"
    },
    salary: 95000.00,
    gender: "M",
    birthDate: new Date("1980-05-15"),
    deptId: "D001",
    supervisorSSN: null,
    projects: [
      { projectId: "P001", hoursPerWeek: 20.0 },
      { projectId: "P002", hoursPerWeek: 20.0 }
    ]
  },
  {
    ssn: "987-65-4321",
    firstName: "Jane",
    lastName: "Smith",
    address: {
      street: "456 Park Ave",
      city: "Chicago",
      state: "IL",
      zipCode: "60601"
    },
    salary: 85000.00,
    gender: "F",
    birthDate: new Date("1985-10-22"),
    deptId: "D002",
    supervisorSSN: null,
    projects: [
      { projectId: "P003", hoursPerWeek: 40.0 }
    ]
  },
  {
    ssn: "456-78-9012",
    firstName: "Bob",
    lastName: "Johnson",
    address: {
      street: "789 Oak Dr",
      city: "San Francisco",
      state: "CA",
      zipCode: "94107"
    },
    salary: 75000.00,
    gender: "M",
    birthDate: new Date("1990-02-18"),
    deptId: "D001",
    supervisorSSN: "123-45-6789",
    projects: [
      { projectId: "P001", hoursPerWeek: 10.0 },
      { projectId: "P002", hoursPerWeek: 30.0 }
    ]
  }
];

const sampleDependents = [
  {
    employeeSSN: "123-45-6789",
    name: "Mary Doe",
    gender: "F",
    birthDate: new Date("1982-03-20"),
    relationship: "Spouse"
  },
  {
    employeeSSN: "123-45-6789",
    name: "James Doe",
    gender: "M",
    birthDate: new Date("2010-11-05"),
    relationship: "Child"
  },
  {
    employeeSSN: "987-65-4321",
    name: "Michael Smith",
    gender: "M",
    birthDate: new Date("1984-07-12"),
    relationship: "Spouse"
  }
];

// Setup function to initialize the database
async function setupDatabase() {
  try {
    // Connect to database
    await connectToDatabase();
    console.log('Setting up company database...');
    
    // Create collections with validation
    await departmentModel.createCollection();
    await projectModel.createCollection();
    await employeeModel.createCollection();
    await dependentModel.createCollection();
    
    // Insert sample data
    await insertSampleData();
    
    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await closeConnection();
  }
}

// Insert sample data function
async function insertSampleData() {
  try {
    // Insert departments
    console.log('Inserting sample departments...');
    for (const dept of sampleDepartments) {
      try {
        await departmentModel.createDepartment(dept);
      } catch (err) {
        console.log(`Skipping duplicate department: ${dept.deptId}`);
      }
    }
    
    // Insert projects
    console.log('Inserting sample projects...');
    for (const project of sampleProjects) {
      try {
        await projectModel.createProject(project);
      } catch (err) {
        console.log(`Skipping duplicate project: ${project.projectId}`);
      }
    }
    
    // Insert employees
    console.log('Inserting sample employees...');
    for (const employee of sampleEmployees) {
      try {
        await employeeModel.createEmployee(employee);
      } catch (err) {
        console.log(`Error inserting employee ${employee.ssn}: ${err.message}`);
        if (err.errInfo && err.errInfo.details) {
          console.log(JSON.stringify(err.errInfo.details, null, 2));
        }
      }
    }
    
    // Insert dependents
    console.log('Inserting sample dependents...');
    for (const dependent of sampleDependents) {
      try {
        await dependentModel.createDependent(dependent);
      } catch (err) {
        console.log(`Skipping duplicate dependent: ${dependent.employeeSSN} - ${dependent.name}`);
      }
    }
    
    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error inserting sample data:', error);
    throw error;
  }
}

// Run the setup
setupDatabase(); 