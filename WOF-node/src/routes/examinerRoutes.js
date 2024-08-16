const express = require('express');
const router = express.Router();
const examinerMiddleware = require("../middleware/examinerMiddleware");
const examinerController = require("../controllers/examinerController");
const wofController = require("../controllers/wofController");


router.post('/vehicle-register-by-examiner', examinerMiddleware.verifyToken, examinerController.registerVehicleByExaminer); //tested and work

//FastAPI Python
router.post('/predict', examinerMiddleware.verifyToken,  examinerController.predictVehicle);

router.get('/bookedSlots', examinerMiddleware.verifyToken, examinerController.getAllBookedSlots);//tested and work

router.get('/get-all-users', examinerMiddleware.verifyToken, examinerController.getAllUsers); //tested and work

router.get('/get-all-vehicles-users',  examinerMiddleware.verifyToken, examinerController.getAllVehicles); //tested and work

router.get('/get-all-users', examinerMiddleware.verifyToken, examinerController.getAllUsers); //tested and work

router.get('/get-all-users-with-vehicles', examinerMiddleware.verifyToken, examinerController.getAllUsersWithVehicles); //tested and work



router.post('/create-wof', examinerMiddleware.verifyToken, wofController.createWOF);

router.get('/wof', examinerMiddleware.verifyToken, wofController.getAllWOFS);

//retrieve logged-in examiner details
router.get('/details', examinerMiddleware.verifyToken , examinerController.getExaminerDetails);


module.exports = router;
