import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  // References
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: [true, 'Booking reference is required'],
    index: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
    index: true
  },
  
  // Transaction Details
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  paymentIntentId: String, // For Stripe/Razorpay
  
  // Amount
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  currency: {
    type: String,
    required: true,
    default: 'USD',
    uppercase: true
  },
  
  // Payment Method
  paymentMethod: {
    type: String,
    required: [true, 'Payment method is required'],
    enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash', 'other']
  },
  
  // Card Details (masked for security)
  cardDetails: {
    last4: String,
    brand: String, // visa, mastercard, amex, etc.
    expiryMonth: Number,
    expiryYear: Number
  },
  
  // Payment Status
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'succeeded', 'failed', 'refunded', 'partially_refunded', 'cancelled'],
    default: 'pending',
    index: true
  },
  
  // Payment Type
  paymentType: {
    type: String,
    required: true,
    enum: ['deposit', 'full_payment', 'additional_charge', 'refund'],
    default: 'full_payment'
  },
  
  // Refund Information
  refundAmount: {
    type: Number,
    min: 0
  },
  refundedAt: Date,
  refundReason: String,
  
  // Gateway Response
  gatewayResponse: {
    code: String,
    message: String,
    raw: mongoose.Schema.Types.Mixed
  },
  
  // Metadata
  description: String,
  receiptUrl: String,
  invoiceUrl: String,
  
  // Timestamps
  paidAt: Date
}, {
  timestamps: true
});

// Indexes
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ booking: 1 });
paymentSchema.index({ user: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ createdAt: -1 });

// Method to process refund
paymentSchema.methods.processRefund = async function(amount, reason) {
  if (this.status !== 'succeeded') {
    throw new Error('Can only refund successful payments');
  }
  
  if (amount > this.amount) {
    throw new Error('Refund amount cannot exceed payment amount');
  }
  
  const refundAmount = amount || this.amount;
  
  this.refundAmount = refundAmount;
  this.refundedAt = new Date();
  this.refundReason = reason;
  
  if (refundAmount === this.amount) {
    this.status = 'refunded';
  } else {
    this.status = 'partially_refunded';
  }
  
  await this.save();
  return this;
};

// Method to generate receipt (placeholder - integrate with actual receipt service)
paymentSchema.methods.generateReceipt = function() {
  // This would integrate with a receipt generation service
  const receiptId = `RCPT-${this._id.toString().substring(0, 8).toUpperCase()}`;
  this.receiptUrl = `/receipts/${receiptId}`;
  return this.receiptUrl;
};

// Method to update payment status with validation
paymentSchema.methods.updateStatus = async function(newStatus) {
  const validTransitions = {
    pending: ['processing', 'failed', 'cancelled'],
    processing: ['succeeded', 'failed'],
    succeeded: ['refunded', 'partially_refunded'],
    failed: ['pending'],
    refunded: [],
    partially_refunded: ['refunded'],
    cancelled: []
  };
  
  if (!validTransitions[this.status].includes(newStatus)) {
    throw new Error(`Invalid status transition from ${this.status} to ${newStatus}`);
  }
  
  this.status = newStatus;
  
  if (newStatus === 'succeeded') {
    this.paidAt = new Date();
  }
  
  await this.save();
  return this;
};

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
