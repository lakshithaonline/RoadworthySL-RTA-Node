const {login, getAllUsers} = require('../services/ExaminerService');
const examinerService = require("../services/ExaminerService");
const appointmentService = require("../services/AppointmentService");


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
