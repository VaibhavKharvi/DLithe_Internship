// MongoDB Schema for Company Database

// Department Collection
db.createCollection("departments", {
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
});

// Creating index for department
db.departments.createIndex({ "deptId": 1 }, { unique: true });
db.departments.createIndex({ "managerSSN": 1 });

// Project Collection
db.createCollection("projects", {
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
});

// Creating index for project
db.projects.createIndex({ "projectId": 1 }, { unique: true });
db.projects.createIndex({ "deptId": 1 });

// Employee Collection
db.createCollection("employees", {
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
               bsonType: "double",
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
                     hoursPerWeek: { bsonType: "double" }
                  }
               }
            }
         }
      }
   }
});

// Creating indexes for employee
db.employees.createIndex({ "ssn": 1 }, { unique: true });
db.employees.createIndex({ "deptId": 1 });
db.employees.createIndex({ "supervisorSSN": 1 });
db.employees.createIndex({ "projects.projectId": 1 });

// Dependent Collection
db.createCollection("dependents", {
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
});

// Creating index for dependent
db.dependents.createIndex({ "employeeSSN": 1, "name": 1 }, { unique: true });

// Sample document examples

// Sample department
const departmentExample = {
   deptId: "D001",
   deptName: "Engineering",
   managerSSN: "123-45-6789",
   managerStartDate: new Date("2020-01-15"),
   locations: ["New York", "San Francisco"]
};

// Sample project
const projectExample = {
   projectId: "P001",
   projectName: "Client Portal",
   location: "New York",
   deptId: "D001"
};

// Sample employee
const employeeExample = {
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
   supervisorSSN: "987-65-4321",
   projects: [
      { projectId: "P001", hoursPerWeek: 20 },
      { projectId: "P002", hoursPerWeek: 20 }
   ]
};

// Sample dependent
const dependentExample = {
   employeeSSN: "123-45-6789",
   name: "Jane Doe",
   gender: "F",
   birthDate: new Date("1982-03-20"),
   relationship: "Spouse"
}; 