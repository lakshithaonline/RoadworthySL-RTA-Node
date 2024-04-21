const express = require('express');
const router = express.Router();
const examinerMiddleware = require("../middleware/examinerMiddleware");
const examinerController = require("../controllers/examinerController");


router.post('/vehicle-register-by-examiner', examinerMiddleware.verifyToken, examinerController.registerVehicleByExaminer); //tested and work

module.exports = router;
