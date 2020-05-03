const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    tasks: Array
});

module.exports = mongoose.model('userProps', userSchema);