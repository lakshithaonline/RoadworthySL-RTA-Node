const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {JWT_SECRET} = require('../utils/constants');

const registerUser = async (username, email, password, role) => {
    const existingUser = await User.findOne({$or: [{username}, {email}]});
    if (existingUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({username, email, password: hashedPassword, role});
    await newUser.save();
    return newUser;
};

const loginUser = async (username, password) => {
    const user = await User.findOne({username});
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid username or password');
    }
    // return jwt.sign({id: user._id, username: user.username}, JWT_SECRET, {expiresIn: '30m'});
    const token = jwt.sign(
        {id: user._id, username: user.username, role: user.role},  // Include role in the JWT
        JWT_SECRET,
        {expiresIn: '10h'}
    );
    return token;
};

module.exports = {registerUser, loginUser};


