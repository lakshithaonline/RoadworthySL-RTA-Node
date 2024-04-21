const express = require('express');
const router = express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const vehicleController = require("../controllers/vehicleController");



router.post('/vehicle-register', userMiddleware.verifyUserToken, vehicleController.registerVehicle); //tested and works

module.exports = router;
