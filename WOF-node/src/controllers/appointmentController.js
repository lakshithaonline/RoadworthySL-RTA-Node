const appointmentService = require('../services/AppointmentService');
const vehicleService = require('../services/VehicleService');
const {verify} = require("jsonwebtoken");
const {JWT_SECRET} = require("../utils/constants");

exports.createAppointment = async (req, res) => {
    try {
        // Extract user ID from the JWT token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: 'No token provided'});
        }
        const decoded = verify(token, JWT_SECRET);
        const userId = decoded.id;

        // Find all vehicles belonging to the user
        const vehicles = await vehicleService.getVehiclesByOwnerId(userId);
        if (!vehicles || vehicles.length === 0) {
            return res.status(400).json({message: 'No vehicles found for this user'});
        }

        // Extract necessary data from the request body
        const {date, time, registrationNumber} = req.body;

        // Check if the selected vehicle belongs to the user
        const vehicle = vehicles.find(v => v.registrationNumber === registrationNumber);
        if (!vehicle) {
            return res.status(400).json({message: 'Vehicle does not belong to the user'});
        }

        // Check if the selected time slot is available for the vehicle
        const isAvailable = await appointmentService.checkAvailability(date, time, registrationNumber);
        if (isAvailable) {
            return res.status(400).json({message: 'This slot is already booked.'});
        }

        // Check if the selected date is at least 3 months after the last appointment date
        const hasRecentAppointment = await appointmentService.checkRecentAppointment(registrationNumber, date);
        if (hasRecentAppointment) {
            return res.status(400).json({message: 'Vehicle cannot book an appointment within 3 months of the last appointment.'});
        }

        // Create the appointment
        const appointmentData = {
            userId,
            vehicleId: vehicle._id,
            registrationNumber,
            date,
            time
        };
        const appointment = await appointmentService.bookAppointment(appointmentData);
        res.status(201).json({message: 'Appointment booked successfully.', appointment});
    } catch (error) {
        console.error('Error booking appointment:', error.message);
        res.status(500).json({message: 'Error booking appointment.', error});
    }
};

exports.getUserVehicles = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: 'No token provided'});
        }
        const decoded = verify(token, JWT_SECRET);
        const userId = decoded.id;

        const vehicles = await vehicleService.getVehiclesByOwnerId(userId);
        res.status(200).json({vehicles});
    } catch (error) {
        console.error('Error retrieving vehicles:', error.message);
        res.status(400).json({message: error.message});
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

exports.getUserAppointments = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: 'No token provided'});
        }
        const decoded = verify(token, JWT_SECRET);
        const userId = decoded.id;

        const appointments = await appointmentService.getUserAppointments(userId);
        res.status(200).json(appointments);
    } catch (error) {
        console.error('Error retrieving user appointments:', error.message);
        res.status(500).json({message: 'Error retrieving user appointments.', error});
    }
};

// Edit Appointment
exports.editAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;
        const { date, time } = req.body;

        const updatedAppointment = await appointmentService.editAppointment(appointmentId, { date, time });

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment updated successfully.', updatedAppointment });
    } catch (error) {
        console.error('Error updating appointment:', error.message);
        res.status(500).json({ message: 'Error updating appointment', error });
    }
};

//Delete Appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const appointment = await appointmentService.deleteAppointment(appointmentId);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully.' });
    } catch (error) {
        console.error('Error deleting appointment:', error.message);
        res.status(500).json({ message: 'Error deleting appointment', error });
    }
};
