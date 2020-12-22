const mongoose = require('mongoose');

const User = new mongoose.Schema({
    id: String,
    tasks: Array
})

module.exports = mongoose.model('Users', User);