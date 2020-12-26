const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { 
    scope: ['profile'], 
    prompt : "select_account" 
}));

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (_req, res) => res.redirect('/')
);

module.exports = router