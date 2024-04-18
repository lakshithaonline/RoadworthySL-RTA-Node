const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    make: String,
    model: String,
    vinNumber: String,
    mfd: Date,
    reg: Date,
    mileage: Number,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // Assuming Examiner model for now, you might need to change it
    },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
