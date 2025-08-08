const express = require('express');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Lead = require('../models/Lead');
const { sendEmail, emailTemplates } = require('../utils/emailService');

const router = express.Router();

// Validation rules for lead creation
const leadValidationRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Name can only contain letters and spaces'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),

  body('businessType')
    .notEmpty()
    .withMessage('Business type is required')
    .isIn(['Startup', 'Small Business', 'Agency', 'Enterprise', 'Freelancer', 'Consultant', 'Ecommerce', 'Other'])
    .withMessage('Please select a valid business type'),

  body('message')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message cannot exceed 1000 characters')
];

// @route   POST /api/leads
// @desc    Create a new lead
// @access  Public
router.post('/', leadValidationRules, asyncHandler(async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors.array()
    });
  }

  const { name, email, phone, businessType, message } = req.body;

  // Check if lead with this email already exists
  const existingLead = await Lead.findOne({ email: email.toLowerCase() });
  if (existingLead) {
    return res.status(409).json({
      success: false,
      error: 'A lead with this email already exists',
      message: 'Thank you for your interest! We already have your information and will contact you soon.'
    });
  }


  // Create new lead
  const newLead = new Lead({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    phone: phone.trim(),
    businessType,
    message: message ? message.trim() : '',
  });

  // Save to database
  const savedLead = await newLead.save();

  // Optional: Send email notification (if EMAIL_TO is configured)
  if (process.env.EMAIL_TO) {
    try {
      const template = emailTemplates.newLead({
        name,
        email,
        phone,
        businessType,
        message,
        ipAddress: req.ip
      });

      await sendEmail({
        to: process.env.EMAIL_TO,
        subject: template.subject,
        html: template.html,
        text: template.text
      });
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError);
      // Don't fail the request if email fails
    }
  }

  res.status(201).json({
    success: true,
    message: 'Thank you for your interest! We will contact you soon to schedule your free demo.',
    data: {
      id: savedLead._id,
      name: savedLead.name,
      email: savedLead.email,
      businessType: savedLead.businessType,
      createdAt: savedLead.createdAt
    }
  });
}));

module.exports = router;
