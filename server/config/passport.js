const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// In-memory user store (replace with database later)
const users = [];

module.exports = function(passport) {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    const user = users.find(user => user.id === id);
    done(null, user || null);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback',
        passReqToCallback: true,
        scope: ['profile', 'email'],
        // Don't set hd parameter here - we'll validate domain ourselves for better error handling
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          // Extract email from profile
          const email = profile.emails[0].value;
          
          // Check email domain
          if (!email.endsWith(`@${process.env.COMPANY_DOMAIN}`)) {
            // Instead of throwing an error, return false with a specific message
            return done(null, false, { message: `Access restricted to ${process.env.COMPANY_DOMAIN} email addresses` });
          }
          
          // Check if user exists
          let user = users.find(u => u.googleId === profile.id);
          
          if (user) {
            // User exists, update login time
            user.lastLogin = new Date();
          } else {
            // Create new user
            user = {
              id: Date.now().toString(),
              googleId: profile.id,
              displayName: profile.displayName,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: email,
              photo: profile.photos[0].value,
              createdAt: new Date(),
              lastLogin: new Date()
            };
            users.push(user);
          }
          
          return done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
};