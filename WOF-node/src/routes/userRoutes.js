const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/userController');

router.post('/login', login);
router.post('/create', register);

module.exports = router;
