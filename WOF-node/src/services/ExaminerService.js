const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Examiner = require('../models/examiner');
const { JWT_SECRET } = require('../utils/constants');
const User = require("../models/user");
const Vehicle = require("../models/vehicle");

const login = async (username, password) => {
    const examiner = await Examiner.findOne({ username });
    if (!examiner || !(await bcrypt.compare(password, examiner.password))) {
        throw { status: 401, message: 'Invalid username or password' };
    }
    const token = jwt.sign(
        { id: examiner._id, username: examiner.username, role: examiner.role }, // Include role in the JWT
        JWT_SECRET,
        { expiresIn: '10h' }
    );
    return token;
};

const registerVehicleAndCreateUser = async (vehicleData, examinerData) => {
    const { registrationNumber, make, model, vinNumber, mfd, reg, mileage } = vehicleData;
    console.log(`Examiner ${examinerData.username} is registering a new vehicle.`);

    const defaultUsername = `user_${registrationNumber.toLowerCase()}`;
    const defaultEmail = `${defaultUsername}@example.com`;
    const defaultPassword = await bcrypt.hash('defaultPassword123', 10);
    const defaultFirstName = make.length > 0 ? make.split(' ')[0] : 'DefaultFirst';
    const defaultLastName = model.length > 0 ? model.split(' ')[0] : 'DefaultLast';

    const newUser = new User({
        username: defaultUsername,
        email: defaultEmail,
        password: defaultPassword,
        firstName: defaultFirstName,
        lastName: defaultLastName,
        profilePicture: 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png',
        role: 'user'
    });
    await newUser.save();

    const newVehicle = new Vehicle({
        registrationNumber,
        make,
        model,
        vinNumber,
        mfd,
        reg,
        mileage,
        owner: newUser._id,
        registeredBy: examinerData._id // Ensure this field exists in the schema
    });
    await newVehicle.save();

    return { newUser, newVehicle };
};

const getAllUsers = async () => {
    try {
        const users = await User.find({});
        return users;
    } catch (error) {
        throw new Error('Error retrieving users');
    }
};

const getAllExaminers = async () => {
    try {
        const examiner = await Examiner.find();
        return examiner;
    } catch (error) {
        throw new Error('Failed to retrieve users: ' + error.message);
    }
};


const getAllVehiclesWithOwners = async () => {
    try {
        const vehicles = await Vehicle.find().populate('owner', 'username');
        return vehicles;
    } catch (error) {
        throw new Error('Error fetching vehicles with owners: ' + error.message);
    }
};

const getExaminerByToken = async (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const examinerId = decoded.id;

        const examiner = await Examiner.findById(examinerId).select('-password');

        if (!examiner) {
            throw new Error('Examiner not found');
        }

        return examiner;
    } catch (error) {
        throw new Error('Invalid token or token expired');
    }
};


module.exports = { login, registerVehicleAndCreateUser, getAllExaminers, getAllUsers, getAllVehiclesWithOwners, getExaminerByToken  };
