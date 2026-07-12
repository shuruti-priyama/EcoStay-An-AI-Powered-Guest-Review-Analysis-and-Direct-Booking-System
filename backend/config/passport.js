const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

      
        let user = await User.findOne({ googleId: profile.id });

     
        if (!user && email) {
          user = await User.findOne({ email });
          if (user) {
            user.googleId = profile.id;
            user.authProvider = user.authProvider === 'local' ? user.authProvider : 'google';
            if (!user.avatar && profile.photos?.[0]?.value) user.avatar = profile.photos[0].value;
            await user.save();
          }
        }

        if (!user) {
          user = await User.create({
            name: profile.displayName || 'EcoStay Guest',
            email,
            googleId: profile.id,
            authProvider: 'google',
            avatar: profile.photos?.[0]?.value || '',
            role: 'guest',
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
