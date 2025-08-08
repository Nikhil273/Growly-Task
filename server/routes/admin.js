const express = require('express');
const asyncHandler = require('express-async-handler');
const Lead = require('../models/Lead');

const router = express.Router();

// Simple authentication middleware (in production, use proper JWT)
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  // Simple token check - in production, use proper JWT verification
  if (!token || token !== process.env.ADMIN_TOKEN) {
    // For demo purposes, allow access without token in development
    if (process.env.NODE_ENV === 'development') {
      return next();
    }
    return res.status(401).json({
      success: false,
      error: 'Access denied. Admin token required.'
    });
  }

  next();
};

// @route   GET /api/admin/leads
// @desc    Get all leads with pagination and filtering
// @access  Admin only
router.get('/leads', authenticateAdmin, asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    status,
    businessType,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    search
  } = req.query;

  // Build filter object
  const filter = {};

  if (status && status !== 'all') {
    filter.status = status;
  }

  if (businessType && businessType !== 'all') {
    filter.businessType = businessType;
  }

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } }
    ];
  }

  // Calculate pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const sortOptions = {};
  sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // Get leads with pagination
  const leads = await Lead.find(filter)
    .sort(sortOptions)
    .skip(skip)
    .limit(parseInt(limit))
    .select('-userAgent -ipAddress'); // Exclude sensitive data

  // Get total count for pagination
  const totalLeads = await Lead.countDocuments(filter);
  const totalPages = Math.ceil(totalLeads / parseInt(limit));

  // Get statistics
  const stats = await Lead.getStats();

  res.json({
    success: true,
    data: {
      leads,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalLeads,
        hasNext: parseInt(page) < totalPages,
        hasPrev: parseInt(page) > 1
      },
      stats,
      filters: {
        status,
        businessType,
        search,
        sortBy,
        sortOrder
      }
    }
  });
}));

// @route   GET /api/admin/leads/:id
// @desc    Get a single lead by ID
// @access  Admin only
router.get('/leads/:id', authenticateAdmin, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const lead = await Lead.findById(id);
  if (!lead) {
    return res.status(404).json({
      success: false,
      error: 'Lead not found'
    });
  }

  res.json({
    success: true,
    data: {
      lead
    }
  });
}));

// @route   PUT /api/admin/leads/:id/status
// @desc    Update lead status
// @access  Admin only
router.put('/leads/:id/status', authenticateAdmin, asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  // Validate status
  const validStatuses = ['new', 'contacted', 'qualified', 'converted', 'closed'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
    });
  }

  const lead = await Lead.findById(id);
  if (!lead) {
    return res.status(404).json({
      success: false,
      error: 'Lead not found'
    });
  }

  lead.status = status;
  if (notes) {
    lead.notes = notes;
  }
  lead.updatedAt = new Date();

  const updatedLead = await lead.save();

  res.json({
    success: true,
    message: 'Lead status updated successfully',
    data: {
      lead: updatedLead
    }
  });
}));

// @route   DELETE /api/admin/leads/:id
// @desc    Delete a lead
// @access  Admin only
router.delete('/leads/:id', authenticateAdmin, asyncHandler(async (req, res) => {
  const { id } = req.params;

  const lead = await Lead.findById(id);
  if (!lead) {
    return res.status(404).json({
      success: false,
      error: 'Lead not found'
    });
  }

  await Lead.findByIdAndDelete(id);

  res.json({
    success: true,
    message: 'Lead deleted successfully'
  });
}));

// @route   GET /api/admin/stats
// @desc    Get admin dashboard statistics
// @access  Admin only
router.get('/stats', authenticateAdmin, asyncHandler(async (req, res) => {
  const stats = await Lead.getStats();

  // Get leads by date (last 7 days)
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const recentLeads = await Lead.find({
    createdAt: { $gte: last7Days }
  }).sort({ createdAt: -1 });

  // Group by date
  const leadsByDate = {};
  recentLeads.forEach(lead => {
    const date = lead.createdAt.toISOString().split('T')[0];
    leadsByDate[date] = (leadsByDate[date] || 0) + 1;
  });

  res.json({
    success: true,
    data: {
      ...stats,
      recentActivity: {
        last7Days: recentLeads.length,
        leadsByDate
      }
    }
  });
}));

module.exports = router;
