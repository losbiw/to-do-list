const { join } = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({ path: join(__dirname, './.env') })
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', require('./routes/auth'));

mongoose.connect(process.env.MONGO_DB_CONNECT);

app.get('/', () => {
    console.log('this is main');
})

app.get('*', () => {
    console.log('this is error');
})

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
});