// models/admin.js (assuming you are using MongoDB with Mongoose)
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'admin'
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
