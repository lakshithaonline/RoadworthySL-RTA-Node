const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddleware = require("../middleware/adminMiddleware");


router.post('/register-examiner', adminMiddleware.verifyAdminToken, adminController.registerExaminer); //tested and works

module.exports = router;
