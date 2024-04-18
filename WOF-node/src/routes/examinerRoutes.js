const express = require('express');
const router = express.Router();
const { loginExaminer, registerExaminer} = require('../controllers/examinerController');
const authMiddleware = require("../middleware/authMiddleware");
const vehicleController = require("../controllers/vehicleController");

router.post('/login', loginExaminer);
router.post('/create', registerExaminer);
router.post('/register-vehicle', authMiddleware.verifyToken, vehicleController.registerVehicleByExaminer);

module.exports = router;
