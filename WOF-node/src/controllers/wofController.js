const wofService = require('../services/InspectionService');
const { JWT_SECRET } = require("../utils/constants");
const { verify } = require("jsonwebtoken");
const mongoose = require("mongoose");
const {generateInspectionReport} = require("../services/InspectionReportService");
const PreviousWOF = require("../models/previousWOFs");
const WOF = require("../models/wofInspection");



exports.createWOF = async (req, res) => {
    try {
        const { vehicleId, ownerId, examinerId, ratings, finalScore, outcome, highCriticalConcerns, inspectionDate, nextInspectionDate  } = req.body;

        if (!mongoose.Types.ObjectId.isValid(ownerId) || !mongoose.Types.ObjectId.isValid(vehicleId) || !mongoose.Types.ObjectId.isValid(examinerId)) {
            return res.status(400).json({ message: 'Invalid vehicle, owner, or examiner ID' });
        }

        const requiredFields = [
            'tyres', 'brakes', 'suspension', 'bodyAndChassis', 'lights',
            'glazing', 'wipers', 'doors', 'seatBelts', 'airbags',
            'speedometer', 'exhaustSystem', 'fuelSystem'
        ];

        for (let field of requiredFields) {
            if (ratings[field] === undefined) {
                return res.status(400).json({ message: `Missing value for ${field}` });
            }
        }
        if (!inspectionDate || !nextInspectionDate) {
            return res.status(400).json({ message: 'Missing inspection or next inspection date' });
        }
        if (outcome !== 0 && outcome !== 1) {
            return res.status(400).json({ message: 'Invalid outcome value' });
        }

        const newWOF = await wofService.createWOF(vehicleId, ownerId, examinerId, ratings, finalScore, outcome, highCriticalConcerns, inspectionDate, nextInspectionDate);

        res.status(201).json({ message: 'WOF record created successfully', wof: newWOF });
    } catch (error) {
        console.error('Error creating WOF record:', error.message);
        res.status(400).json({ message: error.message });
    }
};



// Get a WOF record by ID
exports.getWOFById = async (req, res) => {
    try {
        const { id } = req.params;
        const wof = await wofService.getWOFById(id);
        res.status(200).json({ wof });
    } catch (error) {
        console.error('Error retrieving WOF record:', error.message);
        res.status(404).json({ message: error.message });
    }
};

// Get all WOF records
exports.getAllWOFS = async (req, res) => {
    try {
        const wofs = await wofService.getAllWOFS();
        res.status(200).json({ wofs });
    } catch (error) {
        console.error('Error retrieving WOF records:', error.message);
        res.status(500).json({ message: error.message });
    }
};

// Update a WOF record by ID
exports.updateWOF = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedWOF = await wofService.updateWOF(id, updateData);
        res.status(200).json({ message: 'WOF record updated successfully', wof: updatedWOF });
    } catch (error) {
        console.error('Error updating WOF record:', error.message);
        res.status(400).json({ message: error.message });
    }
};

// Delete a WOF record by ID
exports.deleteWOF = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedWOF = await wofService.deleteWOF(id);
        res.status(200).json({ message: 'WOF record deleted successfully', wof: deletedWOF });
    } catch (error) {
        console.error('Error deleting WOF record:', error.message);
        res.status(400).json({ message: error.message });
    }
};

// Get WOF records by the logged-in user's token
exports.getWOFSByToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = verify(token, JWT_SECRET);
        const ownerId = decoded.id; // Assuming the ID is in the token payload

        const wofs = await wofService.getWOFSByOwnerId(ownerId);
        res.status(200).json({ wofs });
    } catch (error) {
        console.error('Error retrieving WOF records:', error.message);
        res.status(400).json({ message: error.message });
    }
};

exports.getWOFsByLoggedInExaminer = async (req, res) => {
    try {
        // Extract token from headers and decode it
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = verify(token, JWT_SECRET);
        const examinerId = decoded.id;

        const wofs = await wofService.getWOFSByExaminer(examinerId);
        res.status(200).json({ wofs });
    } catch (error) {
        console.error('Error retrieving WOF records by logged-in examiner:', error.message);
        res.status(404).json({ message: error.message });
    }
};

// Get WOF records by examiner ID
exports.getWOFSByExaminerId = async (req, res) => {
    try {
        const { examinerId } = req.params;
        const wofs = await wofService.getWOFSByExaminer(examinerId);
        res.status(200).json({ wofs });
    } catch (error) {
        console.error('Error retrieving WOF records by examiner:', error.message);
        res.status(404).json({ message: error.message });
    }
};

//Get WOF records by vehicle ID
exports.getWOFInspectionsByVehicleId = async (req, res) => {
    const { vehicleId } = req.params;

    try {
        const inspections = await wofService.getWOFInspectionsByVehicleId(vehicleId);
        if (!inspections || inspections.length === 0) {
            return res.status(404).json({ message: 'No WOF inspections found for this vehicle.' });
        }
        res.json(inspections);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving WOF inspections.' });
    }
};

exports.downloadInspectionReport = async (req, res) => {
    try {
        const { inspectionId } = req.params;
        const { doc, fileName } = await generateInspectionReport(inspectionId);

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

        doc.pipe(res);
        doc.end();
    } catch (error) {
        console.error('Error generating report:', error.message);
        res.status(500).json({ error: 'Failed to generate report' });
    }
};

exports.moveWOFsToPrevious = async (vehicleId, registrationNumber) => {
    // Find WOFs associated with the vehicle
    const wofsToMove = await WOF.find({ vehicle: vehicleId });

    // Add registrationNumber to WOFs and move them to previousWOFs collection
    const previousWOFs = wofsToMove.map(wof => ({
        ...wof.toObject(),  // Convert mongoose document to plain JavaScript object
        vehicle: null,      // Set vehicle reference to null
        registrationNumber, // Add the registration number for future matching
    }));

    // Insert into previousWOFs collection
    await PreviousWOF.insertMany(previousWOFs);

    // Delete original WOFs
    await WOF.deleteMany({ vehicle: vehicleId });
};

exports.restorePreviousWOFs = async (newVehicleId, registrationNumber) => {
    // Find previous WOFs with the matching registration number
    const previousWOFs = await PreviousWOF.find({ registrationNumber });

    if (previousWOFs.length === 0) {
        // No previous WOFs found for this registration number
        return;
    }

    // Update the WOFs to reference the new vehicle
    const restoredWOFs = previousWOFs.map(wof => ({
        ...wof.toObject(),  // Convert to plain JavaScript object
        vehicle: newVehicleId, // Set new vehicle ID
        registrationNumber: undefined, // Remove registrationNumber field
    }));

    // Insert back into WOF collection
    await WOF.insertMany(restoredWOFs);

    // Remove from previousWOFs collection
    await PreviousWOF.deleteMany({ registrationNumber });
};



