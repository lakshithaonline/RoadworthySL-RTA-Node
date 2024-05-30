const mongoose = require('mongoose');
const {MONGODB_URI} = require("../utils/constants");

const connectDB = async (maxRetries = 5) => {
    let retries = 0;
    while (retries < maxRetries) {
        try {
            const conn = await mongoose.connect(MONGODB_URI, {});
            console.log(`MongoDB Connected: ${conn.connection.host}`);
            break;
        } catch (err) {
            retries++;
            console.error(`Attempt ${retries} failed: ${err.message}`);
            await new Promise(resolve => setTimeout(resolve, 5000)); // wait 5 seconds before retrying
            if (retries === maxRetries) {
                console.error("Could not connect to MongoDB after several attempts.");
                process.exit(1);
            }
        }
    }
};

module.exports = connectDB;
