const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    // New fields for approval functionality
    approved: {
        type: Boolean,
        default: false // Indicates whether the appointment has been approved
    },
    examinerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Examiner',
        default: null // Will store the ID of the examiner who approved the appointment
    }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
