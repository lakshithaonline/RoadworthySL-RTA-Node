const { loginAdmin } = require('../services/adminService');

exports.adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { admin, token } = await loginAdmin(username, password);

        res.json({
            message: 'Admin logged in successfully',
            adminId: admin._id,
            token
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
