const express = require('express');
const router = express.Router();
const examinerMiddleware = require("../middleware/examinerMiddleware");
const examinerController = require("../controllers/examinerController");


router.post('/vehicle-register-by-examiner', examinerMiddleware.verifyToken, examinerController.registerVehicleByExaminer); //tested and work

router.get('/bookedSlots', examinerMiddleware.verifyToken, examinerController.getAllBookedSlots);//tested and work

router.get('/get-all-users', examinerMiddleware.verifyToken, examinerController.getAllUsers); //tested and work

router.get('/get-all-vehicles-users',  examinerMiddleware.verifyToken, examinerController.getAllVehicles); //tested and work

router.get('/get-all-users', examinerMiddleware.verifyToken, examinerController.getAllUsers); //tested and work

router.get('/get-all-users-with-vehicles', examinerMiddleware.verifyToken, examinerController.getAllUsersWithVehicles); //tested and work

module.exports = router;
