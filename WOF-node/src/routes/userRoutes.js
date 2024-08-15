const express = require('express');
const router = express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const vehicleController = require("../controllers/vehicleController");
const appointmentController = require("../controllers/appointmentController");
const wofController = require("../controllers/wofController");


//Vehicle CRUD
router.post('/vehicle-register', userMiddleware.verifyUserToken, vehicleController.registerVehicle); //tested

router.get('/vehicles/:registrationNumber', userMiddleware.verifyUserToken, vehicleController.viewVehicle); //tested

router.get('/vehicles', userMiddleware.verifyUserToken, vehicleController.getVehiclesByToken); //tested (get all vehicles under id)

router.put('/vehicles/:registrationNumber', userMiddleware.verifyUserToken, vehicleController.updateVehicle); //tested

router.delete('/vehicles/:registrationNumber', userMiddleware.verifyUserToken, vehicleController.deleteVehicle); //tested

//Appointment
router.post('/create', userMiddleware.verifyUserToken, appointmentController.createAppointment); //tested

router.get('/bookedSlots', appointmentController.getAllBookedSlots); //tested

router.get('/appointments', userMiddleware.verifyUserToken, appointmentController.getUserAppointments); //tested

//get user's vehicle
router.get('/vehicles', userMiddleware.verifyUserToken, appointmentController.getUserVehicles); //tested

//WOF retrieve by user
router.get('/get-all-wof-by-vehicle/:vehicleId', userMiddleware.verifyUserToken, wofController.getAllWOFS);

router.get('/wofs-by-token', userMiddleware.verifyUserToken, wofController.getWOFSByToken);

router.get('/inspection/:inspectionId/download', userMiddleware.verifyUserToken, wofController.downloadInspectionReport);

module.exports = router;
