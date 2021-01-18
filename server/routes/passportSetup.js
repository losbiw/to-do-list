const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.serializeUser(function(user, done) {
    done(null, user.googleID);
});

passport.deserializeUser(async(id, done) => {
    await User.findOne({ googleID: id }, (err, user) => {
      if(err){
        return done(err, null);
      }
      else{
        return done(null, user);
      }
    });
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async(_token, _tokenSecret, profile, done) => {
        const { id, name, photos } = profile;
        const currentUser = await User.findOne({ googleID: id });
        
        if(currentUser){
          const updatedUser = await User.findOneAndUpdate(
            { googleID: id },
            {
              userName: name.givenName,
              photoURL: photos[0].value
            }
          )
          
          await updatedUser.save();

          done(null, updatedUser);
        }
        else{
          const newUser = await User.create({
            userName: name.givenName,
            photoURL: photos[0].value,
            googleID: id
          });
          await newUser.save();

          done(null, newUser)
        }
    })
)

module.export = passport