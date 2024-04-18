const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { MONGODB_URI } = require('../utils/constants');
const Admin = require('../models/admin'); // Update the path to where your Admin model is located

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const seedAdmin = async () => {
    try {
        // Check if an admin already exists
        const adminExists = await Admin.findOne({ username: 'adminUser' });
        if (adminExists) {
            console.log('Admin already exists in the database.');
            return;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('test123', salt);

        // Create a new admin
        const newAdmin = new Admin({
            username: 'adminUser',
            password: hashedPassword,
            // Include any other fields your Admin model has
        });

        // Save the admin to the database
        await newAdmin.save();
        console.log('Admin user seeded successfully.');
    } catch (err) {
        console.error('Error seeding admin:', err);
    } finally {
        // Close the connection to the database
        mongoose.connection.close();
    }
};

// Run the seed function
seedAdmin();
