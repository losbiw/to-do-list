const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser(function(user, done) {
    done(null, user.googleID);
});

passport.deserializeUser(async(id, done) => {
    const deserialized = await User.findOne({ googleID: id });
    done(null, deserialized);
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async(_token, _tokenSecret, profile, done) => {
        const searchQuery = { googleID: profile.id }
        const currentUser = await User.findOne(searchQuery);
        
        if(currentUser){
          done(null, currentUser);
        }
        else{
          const newUser = await User.create(searchQuery);
          await newUser.save();

          done(null, newUser)
        }
    })
)

module.export = passport