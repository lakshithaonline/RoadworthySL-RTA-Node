const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const {JWT_SECRET} = require("../utils/constants");
const Examiner = require("../models/examiner");

require('dotenv').config();

const loginAdmin = async (username, password) => {
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
        { expiresIn: '10h' }
    );

    return { admin: { id: admin._id, username: admin.username }, token };
};

const createExaminer = async (username, password, email, firstname, lastname, branch, dob, sex, role) => {
    const existingExaminer = await Examiner.findOne({ username });
    if (existingExaminer) {
        throw new Error('Examiner already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newExaminer = new Examiner({ username, password: hashedPassword, email, firstname, lastname, branch, dob, sex, role });
    await newExaminer.save();
    return newExaminer;
};

const updateExaminer = async (id, updateData) => {
    const updatedExaminer = await Examiner.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedExaminer) {
        throw new Error('Examiner not found');
    }
    return updatedExaminer;
};

const deleteExaminer = async (id) => {
    const deletedExaminer = await Examiner.findByIdAndDelete(id);
    if (!deletedExaminer) {
        throw new Error('Examiner not found');
    }
    return deletedExaminer;
};

module.exports = { createExaminer, loginAdmin, updateExaminer, deleteExaminer };