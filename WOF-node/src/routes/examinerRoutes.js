const express = require('express');
const router = express.Router();
const { loginExaminer, registerExaminer} = require('../controllers/examinerController');



router.post('/login', loginExaminer);
router.post('/create', registerExaminer);

module.exports = router;
