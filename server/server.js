const { join } = require('path');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config({ path: join(__dirname, './.env') })
}
require('./routes/passportSetup');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_DB_CONNECT, { useFindAndModify: false }, () => {
    console.log('MongoDB is connected');
});

app.use(express.json()) 
app.use(express.urlencoded({extended: false}))

app.use(
    cookieSession({
      name: "session",
      keys: [process.env.COOKIE_KEY],
      expires: false,
      maxAge: 24 * 60 * 60 * 100
    })
);
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
      origin: "http://localhost:8080",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true
    })
);
app.use('/auth', require('./routes/auth'));
app.use('/data', require('./routes/data'));

app.get('/', (req, res) => {
    res.redirect('http://localhost:8080/');
})

app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
});