const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const userMiddleware = require('./middleware/userMiddleware');
const authMiddleware = require('./middleware/examinerMiddleware');

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const examinerRoutes = require("./routes/examinerRoutes");
const authRouters = require('./routes/authRoutes')
const adminMiddleware = require("./middleware/adminMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Allowing cookies
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

// Routes
app.use('/auth', authRouters);
app.use('/user', userMiddleware.verifyUserToken, userRoutes);
app.use('/admin', adminMiddleware.verifyAdminToken, adminRoutes);
app.use('/examiner', authMiddleware.verifyToken, examinerRoutes);
// app.use('/vehicles', userMiddleware.verifyUserToken, vehicleRoutes); //should be removed and deviated into specific need to each examiner and user routes:

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
