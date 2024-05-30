const Vehicle = require('../models/vehicle');
// const bcrypt = require('bcryptjs');
// const User = require('../models/user');


exports.registerVehicle = async (registrationNumber, make, model, vinNumber, mfd, reg, mileage, ownerId) => {
    const existingVehicle = await Vehicle.findOne({ registrationNumber });
    if (existingVehicle) {
        throw new Error('Vehicle already registered');
    }
    const newVehicle = new Vehicle({ registrationNumber, make, model, vinNumber, mfd, reg, mileage, owner: ownerId });
    await newVehicle.save();
    return newVehicle;
};

exports.updateVehicle = async (registrationNumber, make, model) => {
    const updatedVehicle = await Vehicle.findOneAndUpdate({ registrationNumber }, { make, model }, { new: true });
    if (!updatedVehicle) {
        throw new Error('Vehicle not found');
    }
    return updatedVehicle;
};

exports.deleteVehicle = async (registrationNumber) => {
    const deletedVehicle = await Vehicle.findOneAndDelete({ registrationNumber });
    if (!deletedVehicle) {
        throw new Error('Vehicle not found');
    }
    return deletedVehicle;
};

exports.viewVehicle = async (registrationNumber) => {
    const vehicle = await Vehicle.findOne({ registrationNumber });
    if (!vehicle) {
        throw new Error('Vehicle not found');
    }
    return vehicle;
};

exports.getVehiclesByOwnerId = async (ownerId) => {
    const vehicles = await Vehicle.find({ owner: ownerId });
    return vehicles;
};


//
// //vehicle added by examiner
// async function registerVehicleAndCreateUser(vehicleData, examinerData) {
//     const { registrationNumber, make, model, vinNumber, mfd, reg, mileage } = vehicleData;
//
//     // Log the examiner activity
//     console.log(`Examiner ${examinerData.username} is registering a new vehicle.`);
//
//     // Create default username and email
//     const defaultUsername = `user_${registrationNumber.toLowerCase()}`;
//     const defaultEmail = `${defaultUsername}@example.com`;
//     const defaultPassword = await bcrypt.hash('defaultPassword123', 10);
//
//     // Create User
//     const newUser = new User({
//         username: defaultUsername,
//         email: defaultEmail,
//         password: defaultPassword,
//         role: 'user'
//     });
//     await newUser.save();
//
//     // Create Vehicle with ownerId set to newUser's ID
//     const newVehicle = new Vehicle({
//         registrationNumber,
//         make,
//         model,
//         vinNumber,
//         mfd,
//         reg,
//         mileage,
//         owner: newUser._id,
//         registeredBy: examinerData._id // Storing examiner's ID for reference
//     });
//     await newVehicle.save();
//
//     return { newUser, newVehicle };
// }
//
// module.exports = {
//     registerVehicleAndCreateUser
// };