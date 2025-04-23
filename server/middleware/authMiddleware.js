const jwt = require('jsonwebtoken');

// Verify JWT from cookies
exports.authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Only allow users with company domain emails
exports.requireCompanyEmail = (req, res, next) => {
  const companyDomain = process.env.COMPANY_DOMAIN;
  
  if (!req.user || !req.user.email || !req.user.email.endsWith(`@${companyDomain}`)) {
    return res.status(403).json({ message: 'Access restricted to company email accounts' });
  }
  
  next();
};