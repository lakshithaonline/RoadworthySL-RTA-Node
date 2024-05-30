const vehicleService = require('../services/VehicleService');
const {JWT_SECRET} = require("../utils/constants");
const {verify} = require("jsonwebtoken");

exports.registerVehicle = async (req, res) => {
    try {
        const {registrationNumber, make, model, vinNumber, mfd, reg, mileage} = req.body;
        const ownerId = req.user.id // Assuming the examiner ID is stored in req.user.id after authentication
        const newVehicle = await vehicleService.registerVehicle(registrationNumber, make, model, vinNumber, mfd, reg, mileage, ownerId);
        res.status(201).json({message: 'Vehicle registered successfully', vehicle: newVehicle});
    } catch (error) {
        console.error('Error registering vehicle:', error.message);
        res.status(400).json({message: error.message});
    }
};

exports.updateVehicle = async (req, res) => {
    try {
        const {registrationNumber} = req.params;
        const {make, model} = req.body;
        const updatedVehicle = await vehicleService.updateVehicle(registrationNumber, make, model);
        res.status(200).json({message: 'Vehicle updated successfully', vehicle: updatedVehicle});
    } catch (error) {
        console.error('Error updating vehicle:', error.message);
        res.status(400).json({message: error.message});
    }
};

exports.deleteVehicle = async (req, res) => {
    try {
        const {registrationNumber} = req.params;
        const deletedVehicle = await vehicleService.deleteVehicle(registrationNumber);
        res.status(200).json({message: 'Vehicle deleted successfully', vehicle: deletedVehicle});
    } catch (error) {
        console.error('Error deleting vehicle:', error.message);
        res.status(400).json({message: error.message});
    }
};

exports.viewVehicle = async (req, res) => {
    try {
        const {registrationNumber} = req.params;
        const vehicle = await vehicleService.viewVehicle(registrationNumber);
        res.status(200).json({vehicle});
    } catch (error) {
        console.error('Error viewing vehicle:', error.message);
        res.status(400).json({message: error.message});
    }
};

exports.getVehiclesByToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: 'No token provided'});
        }

        const decoded = verify(token, JWT_SECRET);
        const ownerId = decoded.id;

        const vehicles = await vehicleService.getVehiclesByOwnerId(ownerId);
        res.status(200).json({vehicles});
    } catch (error) {
        console.error('Error retrieving vehicles:', error.message);
        res.status(400).json({message: error.message});
    }
};


// exports.registerVehicleByExaminer = async (req, res) => {
//     try {
//         const vehicleData = req.body;
//         const examinerData = req.user;
//
//         const { newUser, newVehicle } = await vehicleService.registerVehicleAndCreateUser(vehicleData, examinerData);
//
//         res.status(201).json({
//             message: 'Vehicle and user created successfully',
//             user: newUser,
//             vehicle: newVehicle
//         });
//     } catch (error) {
//         console.error('Failed to register vehicle:', error);
//         res.status(500).json({ message: error.message });
//     }
// };