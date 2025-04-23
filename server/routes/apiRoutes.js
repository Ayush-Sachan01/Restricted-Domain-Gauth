
const express = require('express');
const router = express.Router();
const { authenticateToken, requireCompanyEmail } = require('../middleware/authMiddleware');

// Protected route example
router.get('/dashboard-data', authenticateToken, requireCompanyEmail, (req, res) => {
  // Example data that would come from a database
  res.json({
    message: 'You have successfully accessed protected data!',
    timestamp: new Date(),
    user: req.userId
  });
});

// Health check route (public)
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

module.exports = router;