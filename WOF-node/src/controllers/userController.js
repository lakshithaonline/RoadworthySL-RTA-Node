const userService = require('../services/UserService');
const {registerUser, loginUser} = require("../services/UserService");
const { JWT_SECRET } = require("../utils/constants");
const {verify} = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { username, email, password, role, firstName, lastName, profilePicture, dateOfBirth } = req.body;
    try {
        const newUser = await registerUser(username, email, password, role, firstName, lastName, profilePicture, dateOfBirth);

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(400).json({ message: error.message });
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


exports.getUserByToken = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = verify(token, JWT_SECRET);
        const userId = decoded.id;

        const user = await userService.getUserById(userId);
        res.status(200).json({ user });
    } catch (error) {
        console.error('Error retrieving user records:', error.message);
        res.status(400).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = verify(token, JWT_SECRET);
        const userId = decoded.id;

        if (!userId) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const updatedUser = await userService.updateUserById(userId, req.body);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(400).json({ message: error.message });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = verify(token, JWT_SECRET);
        const userId = decoded.id;

        if (!userId) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        const deletedUser = await userService.deleteUserById(userId);
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(400).json({ message: error.message });
    }
};
