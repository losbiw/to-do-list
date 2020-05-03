const express = require('express');
const User = require('../modules/userSchema');
const router = express.Router();

router.get('/', (req, res)=>{
    res.send();
});

router.post('/', async(req, res)=>{
    const id = req.body.id;
    const tasks = req.body.tasks;
    
    const currentUser = await User.findByIdAndUpdate(id, {$set: {tasks: tasks}});
});

module.exports = router;