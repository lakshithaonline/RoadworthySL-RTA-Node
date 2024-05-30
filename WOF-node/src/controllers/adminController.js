const {loginAdmin} = require('../services/AdminService');
const {createExaminer} = require("../services/AdminService");

exports.adminLogin = async (req, res) => {
    try {
        const {username, password} = req.body;
        const {admin, token} = await loginAdmin(username, password);

        res.json({
            message: 'Admin logged in successfully',
            adminId: admin._id,
            token
        });
    } catch (error) {
        res.status(401).json({message: error.message});
    }
};

exports.registerExaminer = async (req, res) => {
    try {
        const {username, password, email, firstname, lastname, branch, dob, sex, role} = req.body;
        const newExaminer = await createExaminer(username, password, email, firstname, lastname, branch, dob, sex, role);
        res.status(201).json({message: 'Examiner registered successfully', examiner: newExaminer});
    } catch (error) {
        console.error('Error registering examiner:', error.message);
        res.status(400).json({message: error.message});
    }
};