const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const highCriticalConcernSchema = new Schema({
    parameter: { type: String, required: true },
    score: { type: Number, required: true },
    severity: { type: String, enum: ['High', 'Medium', 'Low'], required: true }
});

const wofSchema = new Schema({
    vehicle: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    examiner: { type: Schema.Types.ObjectId, ref: 'Examiner', required: true },
    ratings: {
        tyres: { type: Number, required: true },
        brakes: { type: Number, required: true },
        suspension: { type: Number, required: true },
        bodyAndChassis: { type: Number, required: true },
        lights: { type: Number, required: true },
        glazing: { type: Number, required: true },
        wipers: { type: Number, required: true },
        doors: { type: Number, required: true },
        seatBelts: { type: Number, required: true },
        airbags: { type: Number, required: true },
        speedometer: { type: Number, required: true },
        exhaustSystem: { type: Number, required: true },
        fuelSystem: { type: Number, required: true }
    },
    finalScore: { type: Number, required: true },
    outcome: { type: Number, enum: [0, 1], required: true }, // 0 or 1
    highCriticalConcerns: [highCriticalConcernSchema],
    inspectionDate: { type: Date, required: true },
    nextInspectionDate: { type: Date, required: true },
});

const WOF = mongoose.model('WOF', wofSchema);

module.exports = WOF;
