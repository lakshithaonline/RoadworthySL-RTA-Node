const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../utils/constants');

exports.verifyAdminToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Admin Received token:', token);

    if (!token) {
        return res.status(401).json({message: 'No token provided'});
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(401).json({message: 'Admin Invalid token'});
        }
        console.log('Decoded token:', decoded);

        // Check if the decoded token contains necessary information for vehicle authentication
        if (!decoded || !decoded.role || decoded.role !== 'admin') {
            return res.status(403).json({message: 'Unauthorized'});
        }
        req.user = decoded;
        next();
    });
};
