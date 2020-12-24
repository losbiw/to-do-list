const mongoose = require('mongoose');

const User = new mongoose.Schema({
    googleID: String,
    tasks: { type: 'Array', default: [{
        category: 'General',
        list: [
            { value: 'Your first task!' },
        ]
    }] }
})

module.exports = mongoose.model('Users', User);