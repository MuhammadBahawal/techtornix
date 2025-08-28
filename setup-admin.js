const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Simple Admin Schema for setup
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const Admin = mongoose.model('Admin', adminSchema);

const setupAdmin = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/techtornix');
    console.log('Connected to MongoDB');

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username: 'muhammadbahawal' });
    
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    // Create admin
    const admin = new Admin({
      username: 'muhammadbahawal',
      email: 'bahawal.dev@gmail.com',
      password: 'Bahawal@6432',
      role: 'super-admin',
      isActive: true
    });

    await admin.save();
    console.log('Admin created successfully!');
    console.log('Username: muhammadbahawal');
    console.log('Email: bahawal.dev@gmail.com');
    console.log('Password: Bahawal@6432');

  } catch (error) {
    console.error('Setup error:', error);
  } finally {
    await mongoose.disconnect();
  }
};

setupAdmin();
