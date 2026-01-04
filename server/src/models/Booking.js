import mongoose from 'mongoose';
import crypto from 'crypto';

const bookingSchema = new mongoose.Schema({
  // References
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
    index: true
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: [true, 'Car is required'],
    index: true
  },
  
  // Booking Details
  bookingNumber: {
    type: String,
    unique: true
  },
  
  // Dates
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
    index: true
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
    index: true
  },
  actualReturnDate: Date,
  
  // Pickup and Return
  pickupLocation: {
    branch: String,
    address: String,
    city: String,
    state: String
  },
  returnLocation: {
    branch: String,
    address: String,
    city: String,
    state: String
  },
  
  // Pricing Breakdown
  basePrice: {
    type: Number,
    required: [true, 'Base price is required'],
    min: [0, 'Price cannot be negative']
  },
  insurancePrice: {
    type: Number,
    default: 0,
    min: 0
  },
  extraCharges: [{
    description: String,
    amount: Number
  }],
  discountAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  taxAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Total price cannot be negative']
  },
  
  // Additional Services
  extras: [{
    type: {
      type: String,
      enum: ['gps', 'child_seat', 'additional_driver', 'wifi', 'snow_chains']
    },
    quantity: {
      type: Number,
      min: 1,
      default: 1
    },
    price: Number
  }],
  
  // Insurance
  insuranceType: {
    type: String,
    enum: ['basic', 'standard', 'premium', 'none'],
    default: 'basic'
  },
  
  // Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'],
    default: 'pending',
    index: true
  },
  
  // Cancellation
  cancellationReason: String,
  cancelledAt: Date,
  cancelledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  refundAmount: Number,
  
  // Driver Information
  primaryDriver: {
    name: String,
    licenseNumber: String,
    phone: String
  },
  additionalDrivers: [{
    name: String,
    licenseNumber: String,
    phone: String
  }],
  
  // Vehicle Condition
  pickupCondition: {
    fuelLevel: {
      type: String,
      enum: ['empty', 'quarter', 'half', 'three_quarters', 'full']
    },
    mileage: Number,
    damages: [{
      description: String,
      severity: {
        type: String,
        enum: ['minor', 'moderate', 'major']
      },
      images: [String]
    }],
    notes: String
  },
  returnCondition: {
    fuelLevel: String,
    mileage: Number,
    damages: [{
      description: String,
      severity: String,
      images: [String]
    }],
    notes: String,
    additionalCharges: Number
  },
  
  // Payment Reference
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  
  // Special Requests
  specialRequests: String,
  
  // Internal Notes
  internalNotes: String
}, {
  timestamps: true
});

// Indexes
bookingSchema.index({ bookingNumber: 1 });
bookingSchema.index({ user: 1 });
bookingSchema.index({ car: 1 });
bookingSchema.index({ startDate: 1, endDate: 1 });
bookingSchema.index({ status: 1 });

// Pre-save hook to generate booking number before validation
bookingSchema.pre('validate', function(next) {
  if (this.isNew && !this.bookingNumber) {
    this.generateBookingNumber();
  }
  
  // Validation: End date must be after start date
  if (this.endDate <= this.startDate) {
    return next(new Error('End date must be after start date'));
  }
  next();
});

// Generate unique booking number
bookingSchema.methods.generateBookingNumber = function() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  this.bookingNumber = `BK-${timestamp}-${random}`;
};

// Calculate total price
bookingSchema.methods.calculateTotalPrice = function() {
  let total = this.basePrice + this.insurancePrice + this.taxAmount;
  
  // Add extra charges
  if (this.extraCharges && this.extraCharges.length > 0) {
    total += this.extraCharges.reduce((sum, charge) => sum + (charge.amount || 0), 0);
  }
  
  // Add extras
  if (this.extras && this.extras.length > 0) {
    total += this.extras.reduce((sum, extra) => sum + ((extra.price || 0) * (extra.quantity || 1)), 0);
  }
  
  // Subtract discount
  total -= this.discountAmount;
  
  this.totalPrice = Math.max(0, total);
  return this.totalPrice;
};

// Calculate rental duration in days
bookingSchema.methods.calculateDuration = function() {
  const diffTime = Math.abs(this.endDate - this.startDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Check if booking can be cancelled
bookingSchema.methods.canBeCancelled = function() {
  const now = new Date();
  const hoursUntilStart = (this.startDate - now) / (1000 * 60 * 60);
  
  // Can cancel if status is pending or confirmed and at least 24 hours before start
  return ['pending', 'confirmed'].includes(this.status) && hoursUntilStart >= 24;
};

// Process refund based on cancellation policy
bookingSchema.methods.processRefund = function() {
  const now = new Date();
  const hoursUntilStart = (this.startDate - now) / (1000 * 60 * 60);
  
  let refundPercentage = 0;
  
  if (hoursUntilStart >= 72) {
    // 100% refund if cancelled 72+ hours before
    refundPercentage = 1.0;
  } else if (hoursUntilStart >= 24) {
    // 50% refund if cancelled 24-72 hours before
    refundPercentage = 0.5;
  } else {
    // No refund if cancelled less than 24 hours before
    refundPercentage = 0;
  }
  
  this.refundAmount = this.totalPrice * refundPercentage;
  return this.refundAmount;
};

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
