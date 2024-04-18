const express = require('express');
const connectDB = require('./config/database');

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const examinerRoutes = require("./routes/examinerRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json()); // This replaces bodyParser.json()

connectDB();

// Routes
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.use('/examiner', examinerRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
