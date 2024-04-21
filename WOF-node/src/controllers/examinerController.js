const { login } = require('../services/ExaminerService');
const examinerService = require("../services/ExaminerService");


exports.loginExaminer = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await login(username, password);
        console.log('Examiner logged in successfully:', username);
        res.status(200).json({ token });
    } catch (err) {
        console.error('Error logging in examiner:', err.message);
        res.status(err.status || 500).json({ message: err.message });
    }
};

exports.registerVehicleByExaminer = async (req, res) => {
    try {
        const vehicleData = req.body;
        const examinerData = req.user;

        const { newUser, newVehicle } = await examinerService.registerVehicleAndCreateUser(vehicleData, examinerData);

        res.status(201).json({
            message: 'Vehicle and user created successfully',
            user: newUser,
            vehicle: newVehicle
        });
    } catch (error) {
        console.error('Failed to register vehicle:', error);
        res.status(500).json({ message: error.message });
    }
};
