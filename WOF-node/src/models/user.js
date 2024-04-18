const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    role: { type: String, default: 'user' }
});

module.exports = mongoose.model('User', userSchema);
