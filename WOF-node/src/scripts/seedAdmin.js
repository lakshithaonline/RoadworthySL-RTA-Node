const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {MONGODB_URI} = require('../utils/constants');
const Admin = require('../models/admin');

const ADMIN_USERNAME = process.env.SEED_ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;

if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    console.error('SEED_ADMIN_USERNAME and SEED_ADMIN_PASSWORD environment variables are required to seed an admin.');
    process.exit(1);
}

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const seedAdmin = async () => {
    try {
        const adminExists = await Admin.findOne({username: ADMIN_USERNAME});
        if (adminExists) {
            console.log('Admin already exists in the database.');
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt);

        const newAdmin = new Admin({
            username: ADMIN_USERNAME,
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
