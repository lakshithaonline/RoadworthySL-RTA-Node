const express = require('express');
const connectDB = require('./config/database');
const userMiddleware = require('./middleware/userMiddleware');
const authMiddleware = require('./middleware/authMiddleware');

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const examinerRoutes = require("./routes/examinerRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const testvechileRoutes = require("./routes/testvechileRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

// Routes
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/examiner', authMiddleware.verifyToken, examinerRoutes);
app.use('/vehicles', userMiddleware.verifyUserToken, vehicleRoutes);
app.use('/test', authMiddleware.verifyToken, testvechileRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
