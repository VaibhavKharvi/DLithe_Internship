// Script to reset the employee collection
const { connectToDatabase, closeConnection } = require('./connection');
const employeeModel = require('./models/employeeModel');

async function resetEmployeeCollection() {
  try {
    // Connect to database
    const { db } = await connectToDatabase();
    
    // Drop the existing collection
    console.log('Dropping employees collection...');
    await db.collection('employees').drop();
    console.log('Employees collection dropped');
    
    // Recreate the collection with the updated schema
    console.log('Recreating employees collection...');
    await employeeModel.createCollection();
    
    console.log('Employee collection has been reset successfully');
  } catch (error) {
    console.error('Error resetting employee collection:', error);
  } finally {
    await closeConnection();
  }
}

// Run the reset
resetEmployeeCollection(); 