const mongoose = require('mongoose');
const Admin = require('../models/admin');

async function createAdmin() {
  try {
    await mongoose.connect('mongodb://localhost:27017/Angular-app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const admin = new Admin({
      username: 'nihad',
      password: 'admin',
      email: 'nihad@gmail.com', 
    });

    await admin.save();
    console.log('Admin user created successfully.');
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();