const {loginAdmin} = require('../services/AdminService');
const {createExaminer} = require("../services/AdminService");
const examinerService = require("../services/AdminService");

exports.adminLogin = async (req, res) => {
    try {
        const {username, password} = req.body;
        const {admin, token} = await loginAdmin(username, password);

        res.json({
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

exports.updateExaminer = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedExaminer = await examinerService.updateExaminer(id, updateData);
        res.status(200).json({ message: 'Examiner updated successfully', examiner: updatedExaminer });
    } catch (error) {
        console.error('Error updating examiner:', error.message);
        res.status(400).json({ message: error.message });
    }
};


exports.deleteExaminer = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExaminer = await examinerService.deleteExaminer(id);
        res.status(200).json({ message: 'Examiner deleted successfully', examiner: deletedExaminer });
    } catch (error) {
        console.error('Error deleting examiner:', error.message);
        res.status(400).json({ message: error.message });
    }
};