const mongoose = require('mongoose');

const PreviousWOFSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', default: null },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    examiner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ratings: {
        tyres: Number,
        brakes: Number,
        suspension: Number,
        bodyAndChassis: Number,
        lights: Number,
        glazing: Number,
        wipers: Number,
        doors: Number,
        seatBelts: Number,
        airbags: Number,
        speedometer: Number,
        exhaustSystem: Number,
        fuelSystem: Number,
    },
    finalScore: Number,
    outcome: Number,
    highCriticalConcerns: Array,
    inspectionDate: Date,
    nextInspectionDate: Date,
    registrationNumber: String, // New field to store the registration number
}, { timestamps: true });

const PreviousWOF = mongoose.model('PreviousWOF', PreviousWOFSchema)

module.exports = PreviousWOF;