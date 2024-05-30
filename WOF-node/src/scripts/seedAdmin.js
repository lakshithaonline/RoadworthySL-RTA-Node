const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {MONGODB_URI} = require('../utils/constants');
const Admin = require('../models/admin');

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const seedAdmin = async () => {
    try {
        const adminExists = await Admin.findOne({username: 'adminUser'});
        if (adminExists) {
            console.log('Admin already exists in the database.');
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('test123', salt);

        const newAdmin = new Admin({
            username: 'adminUser',
            password: hashedPassword,
        });
        await newAdmin.save();
        console.log('Admin user seeded successfully.');
    } catch (err) {
        console.error('Error seeding admin:', err);
    } finally {
        mongoose.connection.close();
    }
};

seedAdmin();
