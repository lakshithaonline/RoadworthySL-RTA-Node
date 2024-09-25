const express = require('express');
const router = express.Router();
const userMiddleware = require("../middleware/userMiddleware");
const vehicleController = require("../controllers/vehicleController");
const appointmentController = require("../controllers/appointmentController");
const wofController = require("../controllers/wofController");
const examinerController = require("../controllers/examinerController");
const userController = require("../controllers/userController");
const issueReportController = require("../controllers/issueReportController");


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

// Edit an appointment
router.put('/edit-appointment/:appointmentId', userMiddleware.verifyUserToken, appointmentController.editAppointment);

// Delete an appointment
router.delete('/delete-appointment/:appointmentId', userMiddleware.verifyUserToken, appointmentController.deleteAppointment);


//get user's vehicle
router.get('/vehicles', userMiddleware.verifyUserToken, appointmentController.getUserVehicles); //tested

//WOF retrieve by user
router.get('/get-all-wof-by-vehicle/:vehicleId', userMiddleware.verifyUserToken, wofController.getAllWOFS);

router.get('/wofs-by-token', userMiddleware.verifyUserToken, wofController.getWOFSByToken);

router.get('/inspection/:inspectionId/download', userMiddleware.verifyUserToken, wofController.downloadInspectionReport);

router.get('/details', userMiddleware.verifyUserToken , examinerController.getExaminerDetails);

//user

router.get('/by-token', userMiddleware.verifyUserToken, userController.getUserByToken);

router.put('/update', userMiddleware.verifyUserToken, userController.updateUser);

router.delete('/delete', userMiddleware.verifyUserToken, userController.deleteUser);

//reports:

router.post('/create-reports', userMiddleware.verifyUserToken, issueReportController.createIssueReport);

module.exports = router;
