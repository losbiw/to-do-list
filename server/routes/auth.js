const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const router = require('express').Router();

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    (_token, _tokenSecret, profile, done) => {
        return done(null, profile);
    })
)

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
        console.log(req);
    }
)

module.exports = router