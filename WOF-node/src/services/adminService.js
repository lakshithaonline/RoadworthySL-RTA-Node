const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const {JWT_SECRET} = require("../utils/constants");

require('dotenv').config();

exports.loginAdmin = async (username, password) => {
    const admin = await Admin.findOne({ username: username });
    if (!admin) {
        throw new Error('Admin not found');
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    if (!JWT_SECRET) {
        console.error("JWT_SECRET is not defined. Ensure the environment variable is set.");
        throw new Error("Server misconfiguration");
    }

    const token = jwt.sign(
        { id: admin._id, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { admin: { id: admin._id, username: admin.username }, token };
};
