// Main application file
const express = require('express');
const { connectToDatabase, closeConnection } = require('./db/connection');
const departmentModel = require('./db/models/departmentModel');
const projectModel = require('./db/models/projectModel');
const employeeModel = require('./db/models/employeeModel');
const dependentModel = require('./db/models/dependentModel');

// Initialize Express app
const app = express();
app.use(express.json());

// Connect to database on startup
let db;
connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

// Process cleanup
process.on('SIGINT', async () => {
  await closeConnection();
  process.exit(0);
});

// API Routes for Departments
app.get('/api/departments', async (req, res) => {
  try {
    const departments = await departmentModel.getAllDepartments();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/departments/:id', async (req, res) => {
  try {
    const department = await departmentModel.getDepartmentById(req.params.id);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/departments', async (req, res) => {
  try {
    const result = await departmentModel.createDepartment(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API Routes for Projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await projectModel.getAllProjects();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await projectModel.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/departments/:deptId/projects', async (req, res) => {
  try {
    const projects = await projectModel.getProjectsByDepartment(req.params.deptId);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API Routes for Employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await employeeModel.getAllEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/employees/:ssn', async (req, res) => {
  try {
    const employee = await employeeModel.getEmployeeBySSN(req.params.ssn);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/departments/:deptId/employees', async (req, res) => {
  try {
    const employees = await employeeModel.getEmployeesByDepartment(req.params.deptId);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/employees/:ssn/projects', async (req, res) => {
  try {
    const result = await employeeModel.addProjectToEmployee(req.params.ssn, req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API Routes for Dependents
app.get('/api/employees/:ssn/dependents', async (req, res) => {
  try {
    const dependents = await dependentModel.getDependentsByEmployee(req.params.ssn);
    res.json(dependents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/employees/:ssn/dependents', async (req, res) => {
  try {
    const dependent = {
      employeeSSN: req.params.ssn,
      ...req.body
    };
    const result = await dependentModel.createDependent(dependent);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; 