const express = require('express');
const router = express.Router();
const wofController = require('../controllers/wofController');
const examinerMiddleware = require("../middleware/examinerMiddleware");


// re locate as needed this routes, this route file not setup/confined to route


// Route to get all WOF records for the logged-in user
router.get('/wof', examinerMiddleware.verifyToken, wofController.getAllWOFS);

// Route to get a specific WOF record by its ID
router.get('/wof/:id', examinerMiddleware.verifyToken, wofController.getWOFById);

// Get WOF records by logged-in examiner
router.get('/wof-by-logged-in-examiner', examinerMiddleware.verifyToken, wofController.getWOFsByLoggedInExaminer);

// Get WOF records by a specific examiner ID
router.get('/wof-by-examiner/:examinerId', examinerMiddleware.verifyToken, wofController.getWOFSByExaminerId);

// Route to update a WOF record by its ID
router.put('/wof/:id', examinerMiddleware.verifyToken, wofController.updateWOF);

// Route to delete a WOF record by its ID
router.delete('/wof/:id', examinerMiddleware.verifyToken, wofController.deleteWOF);

module.exports = router;
