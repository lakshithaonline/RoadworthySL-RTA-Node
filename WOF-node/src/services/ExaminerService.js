const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Examiner = require('../models/examiner');
const { JWT_SECRET } = require('../utils/constants');

const register = async (username, password, email, firstname, lastname, branch, dob, age, sex) => {
    const existingExaminer = await Examiner.findOne({ username });
    if (existingExaminer) {
        throw new Error('Examiner already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newExaminer = new Examiner({ username, password: hashedPassword, email, firstname, lastname, branch, dob, age, sex });
    await newExaminer.save();
    return newExaminer;
};

const login = async (username, password) => {
    const examiner = await Examiner.findOne({ username });
    if (!examiner || !(await bcrypt.compare(password, examiner.password))) {
        throw { status: 401, message: 'Invalid username or password' };
    }
    return jwt.sign({id: examiner._id, username: examiner.username}, JWT_SECRET, {expiresIn: '30m'});
};

module.exports = { register, login };
