const jwt = require('jsonwebtoken');

// Get the authenticated user
exports.getUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  
  // Return user info without sensitive data
  const { id, googleId, displayName, firstName, lastName, email, photo } = req.user;
  res.json({
    id,
    googleId,
    displayName,
    firstName,
    lastName,
    email,
    photo
  });
};

// Handle Google OAuth success and issue JWT
exports.googleCallback = (req, res) => {
  if (!req.user) {
    return res.redirect(`${process.env.CLIENT_URL}/login?error=Authentication failed`);
  }

  // Create JWT token
  const token = jwt.sign(
    { id: req.user.id, email: req.user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  // Set token in HTTP-only cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  });

  // Redirect to frontend dashboard
  res.redirect(`${process.env.CLIENT_URL}/dashboard`);
};

// Logout
exports.logout = (req, res) => {
  req.logout(() => {
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  });
};