
const Vehicle = require('../models/vehicle');
const User = require('../models/user');
const WOF = require("../models/wofInspection");
const Examiner = require('../models/examiner');
const {populate} = require("dotenv");

// Create a new WOF record
exports.createWOF = async (vehicleId, ownerId, examinerId, ratings, finalScore, outcome, highCriticalConcerns, inspectionDate) => {
    try {
        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) {
            throw new Error('Vehicle not found');
        }

        const owner = await User.findById(ownerId);
        if (!owner) {
            throw new Error('Owner not found');
        }

        const examiner = await Examiner.findById(examinerId);
        if (!examiner) {
            throw new Error('Examiner not found');
        }

        const newWOF = new WOF({
            vehicle: vehicleId,
            owner: ownerId,
            examiner: examinerId,
            ratings: ratings,
            finalScore: finalScore,
            outcome: outcome,
            highCriticalConcerns: highCriticalConcerns,
            inspectionDate: inspectionDate
        });

        await newWOF.save();
        return newWOF;
    } catch (error) {
        console.error('Error creating WOF record:', error.message);
        throw new Error(`Error creating WOF record: ${error.message}`);
    }
};

// Get a WOF record by ID
exports.getWOFById = async (id) => {
    const wof = await WOF.findById(id).populate('vehicle').populate('owner').populate('examiner');
    if (!wof) {
        throw new Error('WOF record not found');
    }
    return wof;
};

// Get all WOF records (you can add filters and pagination if needed)
exports.getAllWOFS = async () => {
    const wofs = await WOF.find().populate('vehicle').populate('owner');
    return wofs;
};

// Update a WOF record by ID
exports.updateWOF = async (id, updateData) => {
    const updatedWOF = await WOF.findByIdAndUpdate(id, updateData, { new: true }).populate('vehicle').populate('owner');
    if (!updatedWOF) {
        throw new Error('WOF record not found');
    }
    return updatedWOF;
};

// Delete a WOF record by ID
exports.deleteWOF = async (id) => {
    const deletedWOF = await WOF.findByIdAndDelete(id);
    if (!deletedWOF) {
        throw new Error('WOF record not found');
    }
    return deletedWOF;
};

// Retrieve WOF records by owner ID
exports.getWOFSByOwnerId = async (ownerId) => {
    try {
        const wofs = await WOF.find({ owner: ownerId })
            .populate('vehicle', 'registrationNumber make model') // Populate vehicle details
            .populate('owner', 'username email') // Populate owner details if needed
            .populate('examiner', 'firstname email');
        return wofs;
    } catch (error) {
        throw new Error('Error retrieving WOF records: ' + error.message);
    }
};

// Get WOF records by examiner ID
exports.getWOFSByExaminer = async (examinerId) => {
    const wofs = await WOF.find({ examiner: examinerId }).populate('vehicle').populate('owner').populate('examiner');
    if (wofs.length === 0) {
        throw new Error('No WOF records found for this examiner');
    }
    return wofs;
};

exports.getWOFInspectionsByVehicleId = async (vehicleId) => {
    try {
        // Find all WOF inspections for the given vehicle ID
        const inspections = await WOF.find({ vehicle: vehicleId }).populate('vehicle owner').exec();
        return inspections;
    } catch (error) {
        throw new Error('Error fetching WOF inspections');
    }
};
