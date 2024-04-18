const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Examiner = require('../models/examiner');
const { JWT_SECRET } = require('../utils/constants');

const register = async (username, password, email, firstname, lastname, branch, dob, age, sex) => {
    // Check if examiner already exists
    const existingExaminer = await Examiner.findOne({ username });
    if (existingExaminer) {
        throw new Error('Examiner already exists');
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new examiner
    const newExaminer = new Examiner({ username, password: hashedPassword, email, firstname, lastname, branch, dob, age, sex });
    await newExaminer.save();
    return newExaminer;
};

const login = async (username, password) => {
    // Find examiner by username
    const examiner = await Examiner.findOne({ username });
    if (!examiner || !(await bcrypt.compare(password, examiner.password))) {
        throw { status: 401, message: 'Invalid username or password' };
    }
    // Generate JWT token
    const token = jwt.sign({ id: examiner._id, username: examiner.username }, JWT_SECRET, { expiresIn: '30m' });
    return token;
};

module.exports = { register, login };
