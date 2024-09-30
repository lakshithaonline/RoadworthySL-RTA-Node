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
        ref: 'User'  //this will work for only user vehicle creates
    },
    registeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Examiner',
    }
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
