const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Examiner = require('../models/examiner');
const {JWT_SECRET} = require('../utils/constants');
const User = require("../models/user");
const Vehicle = require("../models/vehicle");


const login = async (username, password) => {
    const examiner = await Examiner.findOne({username});
    if (!examiner || !(await bcrypt.compare(password, examiner.password))) {
        throw {status: 401, message: 'Invalid username or password'};
    }
    const token = jwt.sign(
        {id: examiner._id, username: examiner.username, role: examiner.role},  // Include role in the JWT
        JWT_SECRET,
        {expiresIn: '30m'}
    );
    return token;
};


//vehicle added by examiner
async function registerVehicleAndCreateUser(vehicleData, examinerData) {
    const {registrationNumber, make, model, vinNumber, mfd, reg, mileage} = vehicleData;

    // Log the examiner activity
    console.log(`Examiner ${examinerData.username} is registering a new vehicle.`);

    // Create default username and email
    const defaultUsername = `user_${registrationNumber.toLowerCase()}`;
    const defaultEmail = `${defaultUsername}@example.com`;
    const defaultPassword = await bcrypt.hash('defaultPassword123', 10);

    // Create User
    const newUser = new User({
        username: defaultUsername,
        email: defaultEmail,
        password: defaultPassword,
        role: 'user'
    });
    await newUser.save();

    // Create Vehicle with ownerId set to newUser's ID
    const newVehicle = new Vehicle({
        registrationNumber,
        make,
        model,
        vinNumber,
        mfd,
        reg,
        mileage,
        owner: newUser._id,
        registeredBy: examinerData._id // Storing examiner's ID for reference
    });
    await newVehicle.save();

    return {newUser, newVehicle};
}

// module.exports = {
//     registerVehicleAndCreateUser
// };

module.exports = {login, registerVehicleAndCreateUser};
