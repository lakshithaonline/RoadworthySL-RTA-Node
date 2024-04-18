// adminRoutes.js example
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // Adjust the path as needed

router.post('/login', adminController.adminLogin);

module.exports = router;
