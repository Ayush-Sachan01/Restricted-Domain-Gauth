const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

// Google OAuth login route
router.get(
  '/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'],
    prompt: 'select_account'   
  })
  
);

// Google OAuth callback route with improved error handling
router.get(
  '/google/callback',
  (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
      if (err) {
        // Handle server error
        return res.redirect(`${process.env.CLIENT_URL}/login?error=${encodeURIComponent('Authentication error')}`);
      }
      
      if (!user) {
        // This is our domain validation failure case
        const errorMessage = info && info.message ? info.message : 'Invalid email domain';
        return res.redirect(`${process.env.CLIENT_URL}/?error=${encodeURIComponent(errorMessage)}`);
      }
      
      // Login successful, establish session
      req.logIn(user, (err) => {
        if (err) {
          return res.redirect(`${process.env.CLIENT_URL}/login?error=${encodeURIComponent('Failed to establish session')}`);
        }
        
        // Proceed to generate JWT
        return authController.googleCallback(req, res);
      });
    })(req, res, next);
  }
);

// Get current user route (protected)
router.get('/user', authenticateToken, authController.getUser);

// Logout route
router.get('/logout', authController.logout);

module.exports = router;