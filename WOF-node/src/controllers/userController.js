const {registerUser, loginUser} = require('../services/UserService');

exports.register = async (req, res) => {
    const {username, email, password, role} = req.body;
    try {
        const newUser = await registerUser(username, email, password, role);
        res.status(201).json({message: 'User registered successfully', user: newUser});
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(400).json({message: error.message});
    }
};

exports.login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const token = await loginUser(username, password);
        res.json({token});
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(401).json({message: error.message});
    }
};
