const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const userMiddleware = require('../middleware/userMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

// Register a new vehicle
router.post('/register-by-examiner', authMiddleware.verifyToken, vehicleController.registerVehicleByExaminer);

// Update an existing vehicle
router.put('/:registrationNumber', userMiddleware.verifyUserToken, vehicleController.updateVehicle);

// Delete a vehicle
router.delete('/:registrationNumber', userMiddleware.verifyUserToken, vehicleController.deleteVehicle);

// View vehicle details
router.get('/:registrationNumber', userMiddleware.verifyUserToken, vehicleController.viewVehicle);

module.exports = router;
