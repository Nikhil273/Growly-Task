const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function (v) {
        return /^[\+]?[1-9][\d]{0,15}$/.test(v.replace(/\s/g, ''));
      },
      message: 'Please provide a valid phone number'
    }
  },
  businessType: {
    type: String,
    required: [true, 'Business type is required'],
    enum: {
      values: [
        'Startup',
        'Small Business',
        'Agency',
        'Enterprise',
        'Freelancer',
        'Consultant',
        'Ecommerce',
        'Other'
      ],
      message: 'Please select a valid business type'
    }
  },
  message: {
    type: String,
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
    default: ''
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'closed'],
    default: 'new'
  },
  source: {
    type: String,
    default: 'landing_page'
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted creation date
leadSchema.virtual('formattedDate').get(function () {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Index for better query performance
leadSchema.index({ email: 1 });
leadSchema.index({ createdAt: -1 });
leadSchema.index({ status: 1 });

// Pre-save middleware to clean phone number
leadSchema.pre('save', function (next) {
  if (this.phone) {
    // Remove all non-digit characters except +
    this.phone = this.phone.replace(/[^\d+]/g, '');
  }
  next();
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
