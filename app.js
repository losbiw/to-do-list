const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./modules/userSchema');
const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') { require('dotenv/config') }

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    res.render('load');
});

app.post('/', async (req ,res)=>{
    const id = req.body.id;
    const currentUser = await User.find({"_id": id});
    res.render('index', {tasks: currentUser[0].tasks});
});

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/generateId', require('./routes/genID'));
app.use('/addData', require('./routes/addData'));

mongoose.connect(process.env.CONNECTION, ()=>console.log("The server is connected"));

app.listen(PORT, ()=>{
     console.log(`The server is listening on the port ${PORT}`);
});