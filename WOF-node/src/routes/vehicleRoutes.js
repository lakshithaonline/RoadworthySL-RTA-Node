const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const userMiddleware = require('../middleware/userMiddleware');

//to be tested and added to specifically examiner and user
// Update an existing vehicle
router.put('/:registrationNumber', userMiddleware.verifyUserToken, vehicleController.updateVehicle);

// Delete a vehicle
router.delete('/:registrationNumber', userMiddleware.verifyUserToken, vehicleController.deleteVehicle);

// View vehicle details
router.get('/:registrationNumber', userMiddleware.verifyUserToken, vehicleController.viewVehicle);

module.exports = router;
