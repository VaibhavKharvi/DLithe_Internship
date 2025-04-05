# Company Database MongoDB Schema

This repository contains a MongoDB schema design for a company database with the following collections:

## Collections

### Departments
- **deptId**: Unique identifier for the department (string, indexed)
- **deptName**: Name of the department
- **managerSSN**: SSN of the employee managing this department (references employees)
- **managerStartDate**: Date when the manager started managing the department
- **locations**: Array of department locations

### Projects
- **projectId**: Unique identifier for the project (string, indexed)
- **projectName**: Name of the project
- **location**: Location of the project
- **deptId**: ID of the department controlling this project (references departments)

### Employees
- **ssn**: Social Security Number, unique identifier for the employee (string, indexed)
- **firstName**: First name of the employee
- **lastName**: Last name of the employee
- **address**: Object containing street, city, state, and zipCode
- **salary**: Employee's salary (double)
- **gender**: Employee's gender (enum: "M", "F", "Other")
- **birthDate**: Employee's birth date
- **deptId**: ID of the department the employee is assigned to (references departments)
- **supervisorSSN**: SSN of the employee's direct supervisor (references employees)
- **projects**: Array of project assignments with:
  - **projectId**: ID of the project (references projects)
  - **hoursPerWeek**: Hours per week spent on the project

### Dependents
- **employeeSSN**: SSN of the employee this dependent is related to (references employees)
- **name**: Name of the dependent
- **gender**: Dependent's gender (enum: "M", "F", "Other")
- **birthDate**: Dependent's birth date
- **relationship**: Relationship of the dependent to the employee (e.g., spouse, child)

## Relationships

1. **Department-Employee**: One-to-many (one department has many employees)
2. **Department-Project**: One-to-many (one department controls many projects)
3. **Employee-Project**: Many-to-many (employees can work on multiple projects, embedded in the employee document)
4. **Employee-Supervisor**: Many-to-one (many employees can have the same supervisor)
5. **Employee-Dependent**: One-to-many (one employee can have multiple dependents)

## Indexes

Appropriate indexes have been created for all collections to optimize query performance, including:
- Unique indexes for primary keys (deptId, projectId, ssn)
- Regular indexes for foreign keys to improve join operations

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with your MongoDB connection details:
   ```
   MONGODB_URI=mongodb://localhost:27017
   DB_NAME=companyDB
   ```

## Usage

### Setting up the database

To initialize the database with collections and sample data:

```
npm run setup
```

This will:
- Create all collections with proper validation schemas
- Set up necessary indexes
- Insert sample data for all collections

### Running the application

Start the Express server:

```
npm start
```

The server will run on port 3000 by default (configurable via PORT environment variable).

## API Endpoints

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get a specific department
- `POST /api/departments` - Create a new department

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a specific project
- `GET /api/departments/:deptId/projects` - Get projects for a department

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:ssn` - Get a specific employee
- `GET /api/departments/:deptId/employees` - Get employees for a department
- `POST /api/employees/:ssn/projects` - Add a project to an employee

### Dependents
- `GET /api/employees/:ssn/dependents` - Get dependents for an employee
- `POST /api/employees/:ssn/dependents` - Add a dependent to an employee

## Project Structure

- `db/connection.js` - MongoDB connection handling
- `db/models/` - Individual model files for each collection
- `db/setupDatabase.js` - Database initialization script
- `index.js` - Express API server 