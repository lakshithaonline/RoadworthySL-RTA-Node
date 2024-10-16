const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddleware = require("../middleware/adminMiddleware");
const vehicleController = require('../controllers/vehicleController');
const userController = require('../controllers/userController');
const ExaminerController = require('../controllers/examinerController');
const wofController = require("../controllers/wofController");
const AppointmentsController = require("../controllers/appointmentController");


router.post('/register-examiner', adminMiddleware.verifyAdminToken, adminController.registerExaminer); //tested and works

router.put('/edit-examiner/:id', adminMiddleware.verifyAdminToken, adminController.updateExaminer);

router.delete('/delete-examiner/:id', adminMiddleware.verifyAdminToken, adminController.deleteExaminer);

router.get('/get-vehicles-users-wofs', adminMiddleware.verifyAdminToken, vehicleController.getAllVehiclesWithDetails );

//Admin dashboard routes:
router.get('/get-all-vehicles', adminMiddleware.verifyAdminToken, vehicleController.getAllVehicles);

router.get('/get-all-users', adminMiddleware.verifyAdminToken, userController.getAllUsers);

router.get('/get-all-examiners', adminMiddleware.verifyAdminToken, ExaminerController.getAllExaminers)

router.get('/get-all-wofs', adminMiddleware.verifyAdminToken, wofController.getAllWOFS);

//Admin Appointments Management
router.get('/get-all-appointments', adminMiddleware.verifyAdminToken, AppointmentsController.getAppointments)



module.exports = router;
