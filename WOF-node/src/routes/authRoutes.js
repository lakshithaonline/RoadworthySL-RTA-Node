const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const examinerController = require("../controllers/examinerController");
const userController = require("../controllers/userController");

router.post('/admin/login', adminController.adminLogin); //admin login tested and works

router.post('/examiner/login', examinerController.loginExaminer); //examiner login tested and works

router.post('/user/login', userController.login); //user login   tested and works

router.post('/user/create', userController.register); //user register tested and works

module.exports = router;



