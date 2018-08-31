const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    email: String,
    name: String,
    joined: {
        type: Date,
        default: Date.now
    },
    active: Boolean
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;