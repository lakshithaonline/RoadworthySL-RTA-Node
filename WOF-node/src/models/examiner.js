const mongoose = require('mongoose');

const examinerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: false
    },
    branch: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'Examiner'
    }
});

module.exports = mongoose.model('Examiner', examinerSchema);