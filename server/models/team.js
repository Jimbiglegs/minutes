const mongoose = require('mongoose');

let teamSchema = new mongoose.Schema({
    name: String,
    owner: String,
    slack: String,
    members: [String],
    created: {
        type: Date,
        default: Date.now
    }
});

const teamModel = mongoose.model('teams', teamSchema);

module.exports = teamModel;