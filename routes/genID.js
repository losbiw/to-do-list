const express = require('express');
const uuid = require('uuid');
const User = require('../modules/userSchema');
const router = express.Router();

router.get('/', async (req, res)=>{
    const newUser = new User({
        tasks: []
    });
    const createUser = await newUser.save();
    console.log(newUser._id);
    res.json(newUser._id);
});

module.exports = router;