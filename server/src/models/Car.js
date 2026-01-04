import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  // Basic Information
  make: {
    type: String,
    required: [true, 'Car make is required'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Car model is required'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Car year is required'],
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  
  // Vehicle Details
  vin: {
    type: String,
    unique: true,
    sparse: true,
    uppercase: true,
    match: [/^[A-HJ-NPR-Z0-9]{17}$/, 'VIN must be 17 characters']
  },
  licensePlate: {
    type: String,
    required: [true, 'License plate is required'],
    unique: true,
    uppercase: true
  },
  
  // Classification
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['economy', 'compact', 'midsize', 'full-size', 'suv', 'luxury', 'van', 'convertible', 'electric']
  },
  transmission: {
    type: String,
    required: [true, 'Transmission type is required'],
    enum: ['automatic', 'manual', 'cvt']
  },
  fuelType: {
    type: String,
    required: [true, 'Fuel type is required'],
    enum: ['petrol', 'diesel', 'electric', 'hybrid']
  },
  
  // Specifications
  seats: {
    type: Number,
    required: [true, 'Number of seats is required'],
    min: [2, 'Must have at least 2 seats'],
    max: [15, 'Cannot exceed 15 seats']
  },
  doors: {
    type: Number,
    required: [true, 'Number of doors is required'],
    min: [2, 'Must have at least 2 doors'],
    max: [5, 'Cannot exceed 5 doors']
  },
  color: String,
  mileage: {
    type: Number,
    default: 0,
    min: [0, 'Mileage cannot be negative']
  },
  
  // Features
  features: [{
    type: String,
    enum: [
      'air_conditioning',
      'bluetooth',
      'gps',
      'usb_port',
      'backup_camera',
      'sunroof',
      'leather_seats',
      'heated_seats',
      'cruise_control',
      'parking_sensors',
      'keyless_entry',
      'apple_carplay',
      'android_auto',
      'child_seat_anchors'
    ]
  }],
  
  // Pricing
  pricePerDay: {
    type: Number,
    required: [true, 'Daily price is required'],
    min: [0, 'Price cannot be negative']
  },
  pricePerWeek: Number,
  pricePerMonth: Number,
  
  // Insurance Options
  insuranceOptions: [{
    type: {
      type: String,
      enum: ['basic', 'standard', 'premium']
    },
    price: Number,
    coverage: String
  }],
  
  // Deposit
  securityDeposit: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'Deposit cannot be negative']
  },
  
  // Images
  images: [{
    url: {
      type: String,
      required: true
    },
    isPrimary: {
      type: Boolean,
      default: false
    },
    caption: String
  }],
  
  // Location
  location: {
    branch: {
      type: String,
      required: [true, 'Branch location is required']
    },
    address: String,
    city: String,
    state: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  
  // Availability
  isAvailable: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    enum: ['available', 'rented', 'maintenance', 'retired'],
    default: 'available'
  },
  
  // Maintenance
  lastServiceDate: Date,
  nextServiceDate: Date,
  nextServiceMileage: Number,
  
  // Statistics
  totalBookings: {
    type: Number,
    default: 0,
    min: 0
  },
  averageRating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5']
  },
  totalReviews: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Metadata
  description: String,
  notes: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
carSchema.index({ licensePlate: 1 });
carSchema.index({ vin: 1 });
carSchema.index({ category: 1 });
carSchema.index({ isAvailable: 1 });
carSchema.index({ status: 1 });
carSchema.index({ 'location.city': 1 });
carSchema.index({ pricePerDay: 1 });

// Virtual for full car name
carSchema.virtual('fullName').get(function() {
  return `${this.year} ${this.make} ${this.model}`;
});

// Method to update average rating
carSchema.methods.updateAverageRating = async function() {
  const Review = mongoose.model('Review');
  
  const stats = await Review.aggregate([
    { $match: { car: this._id, isApproved: true } },
    {
      $group: {
        _id: '$car',
        avgRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);
  
  if (stats.length > 0) {
    this.averageRating = Math.round(stats[0].avgRating * 10) / 10;
    this.totalReviews = stats[0].numReviews;
  } else {
    this.averageRating = 0;
    this.totalReviews = 0;
  }
  
  await this.save();
};

// Method to check availability for date range
carSchema.methods.checkAvailability = async function(startDate, endDate) {
  const Booking = mongoose.model('Booking');
  
  const conflictingBookings = await Booking.countDocuments({
    car: this._id,
    status: { $in: ['pending', 'confirmed', 'in_progress'] },
    $or: [
      // New booking starts during existing booking
      { startDate: { $lte: startDate }, endDate: { $gte: startDate } },
      // New booking ends during existing booking
      { startDate: { $lte: endDate }, endDate: { $gte: endDate } },
      // New booking encompasses existing booking
      { startDate: { $gte: startDate }, endDate: { $lte: endDate } }
    ]
  });
  
  return conflictingBookings === 0 && this.isAvailable && this.status === 'available';
};

// Method to increment booking count
carSchema.methods.incrementBookingCount = async function() {
  this.totalBookings += 1;
  await this.save();
};

const Car = mongoose.model('Car', carSchema);

export default Car;
