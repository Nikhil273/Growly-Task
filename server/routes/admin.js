const express = require('express');
const asyncHandler = require('express-async-handler');
const Lead = require('../models/Lead');

const router = express.Router();

// Simple authentication middleware - allow all requests in development
const authenticateAdmin = (req, res, next) => {
  // For development, allow all requests
  if (process.env.NODE_ENV === 'development') {
    return next();
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({
      success: false,
      error: 'Access denied. Admin token required.'
    });
  }

  next();
};

// @route   GET /api/admin/leads
// @desc    Get all leads
// @access  Admin only
router.get('/leads', authenticateAdmin, asyncHandler(async (req, res) => {
  try {
    const leads = await Lead.find({})
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: {
        leads
      }
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leads'
    });
  }
}));

module.exports = router;
