const {login, getAllUsers, getAllVehiclesWithOwners} = require('../services/ExaminerService');
const examinerService = require("../services/ExaminerService");
const appointmentService = require("../services/AppointmentService");
const vehicleService = require("../services/ExaminerService");
const {getPrediction} = require("../services/pythonAPI");

exports.loginExaminer = async (req, res) => {
    try {
        const {username, password} = req.body;
        const token = await login(username, password);
        console.log('Examiner logged in successfully:', username);
        res.status(200).json({token});
    } catch (err) {
        console.error('Error logging in examiner:', err.message);
        res.status(err.status || 500).json({message: err.message});
    }
};

exports.registerVehicleByExaminer = async (req, res) => {
    try {
        const vehicleData = req.body;
        const examinerData = req.user;

        const {newUser, newVehicle} = await examinerService.registerVehicleAndCreateUser(vehicleData, examinerData);

        res.status(201).json({
            message: 'Vehicle and user created successfully',
            user: newUser,
            vehicle: newVehicle
        });
    } catch (error) {
        console.error('Failed to register vehicle:', error);
        res.status(500).json({message: error.message});
    }
};

exports.getAllBookedSlots = async (req, res) => {
    try {
        const slots = await appointmentService.getAllBookedSlots();
        res.status(200).json(slots);
    } catch (error) {
        console.error('Error retrieving booked slots:', error.message);
        res.status(500).json({message: 'Error retrieving booked slots.', error});
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving users:', error.message);
        res.status(500).json({ message: 'Error retrieving users' });
    }
};


exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await vehicleService.getAllVehiclesWithOwners();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicles', error: error.message });
    }
};

exports.getAllUsersWithVehicles = async (req, res) => {
    try {
        const users = await getAllUsers();
        const vehicles = await getAllVehiclesWithOwners();

        const vehicleMap = vehicles.reduce((map, vehicle) => {
            if (!map[vehicle.owner._id]) {
                map[vehicle.owner._id] = [];
            }
            map[vehicle.owner._id].push(vehicle);
            return map;
        }, {});

        const usersWithVehicles = users.map(user => ({
            ...user.toObject(),
            vehicles: vehicleMap[user._id] || []
        }));

        res.status(200).json(usersWithVehicles);
    } catch (error) {
        console.error('Error retrieving users with vehicles:', error.message);
        res.status(500).json({ message: 'Error retrieving users with vehicles' });
    }
};

exports.predictVehicle = async (req, res) => {
    try {
        const data = req.body;
        console.log('Received data:', data);

        const result = await getPrediction(data);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error predicting vehicle:', error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

