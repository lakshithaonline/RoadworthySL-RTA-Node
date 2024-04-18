const { register, login } = require('../services/ExaminerService');

exports.registerExaminer = async (req, res) => {
    try {
        const { username, password, email, firstname, lastname, branch, dob, age, sex } = req.body;
        const newExaminer = await register(username, password, email, firstname, lastname, branch, dob, age, sex);
        res.status(201).json({ message: 'Examiner registered successfully', examiner: newExaminer });
    } catch (error) {
        console.error('Error registering examiner:', error.message);
        res.status(400).json({ message: error.message });
    }
};

exports.loginExaminer = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await login(username, password);
        console.log('Examiner logged in successfully:', username); // Add console log for successful login
        res.status(200).json({ token });
    } catch (err) {
        console.error('Error logging in examiner:', err.message);
        res.status(err.status || 500).json({ message: err.message });
    }
};
