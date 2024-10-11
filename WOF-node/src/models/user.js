const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    role: { type: String, default: 'user' },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    profilePicture: { type: String, required: false },
    dateOfBirth: { type: Date }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;