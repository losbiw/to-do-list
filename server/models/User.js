const mongoose = require('mongoose');

const User = new mongoose.Schema({
    googleID: String,
    tasks: { type: 'Array', default: [] }
})

module.exports = mongoose.model('Users', User);