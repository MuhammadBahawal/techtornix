const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/techtornix', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({
      $or: [
        { username: 'muhammadbahawal' },
        { email: 'bahawal.dev@gmail.com' }
      ]
    });

    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin.username);
      process.exit(0);
    }

    // Create new admin
    const admin = new Admin({
      username: 'muhammadbahawal',
      email: 'bahawal.dev@gmail.com',
      password: 'Bahawal@6432',
      role: 'super-admin',
      isActive: true
    });

    await admin.save();
    console.log('Admin created successfully!');
    console.log('Username:', admin.username);
    console.log('Email:', admin.email);
    console.log('Role:', admin.role);

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin();
