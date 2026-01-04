import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
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
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: [true, 'Booking is required']
  },
  
  // Rating
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot exceed 5']
  },
  
  // Detailed Ratings
  ratings: {
    cleanliness: {
      type: Number,
      min: 1,
      max: 5
    },
    comfort: {
      type: Number,
      min: 1,
      max: 5
    },
    performance: {
      type: Number,
      min: 1,
      max: 5
    },
    valueForMoney: {
      type: Number,
      min: 1,
      max: 5
    }
  },
  
  // Review Content
  title: {
    type: String,
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true,
    minlength: [10, 'Comment must be at least 10 characters'],
    maxlength: [2000, 'Comment cannot exceed 2000 characters']
  },
  
  // Media
  images: [{
    url: String,
    caption: String
  }],
  
  // Recommendation
  wouldRecommend: {
    type: Boolean,
    default: true
  },
  
  // Status
  isVerified: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: true
  },
  isFlagged: {
    type: Boolean,
    default: false
  },
  flagReason: String,
  
  // Helpful Votes
  helpfulVotes: {
    type: Number,
    default: 0,
    min: 0
  },
  notHelpfulVotes: {
    type: Number,
    default: 0,
    min: 0
  },
  
  // Response from Company
  response: {
    text: String,
    respondedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    respondedAt: Date
  }
}, {
  timestamps: true
});

// Indexes
reviewSchema.index({ user: 1 });
reviewSchema.index({ car: 1 });
reviewSchema.index({ booking: 1 }, { unique: true }); // One review per booking
reviewSchema.index({ rating: 1 });
reviewSchema.index({ isApproved: 1 });
reviewSchema.index({ createdAt: -1 });

// Calculate average rating from detailed ratings
reviewSchema.methods.calculateAverageRating = function() {
  const ratings = this.ratings;
  const validRatings = [];
  
  if (ratings.cleanliness) validRatings.push(ratings.cleanliness);
  if (ratings.comfort) validRatings.push(ratings.comfort);
  if (ratings.performance) validRatings.push(ratings.performance);
  if (ratings.valueForMoney) validRatings.push(ratings.valueForMoney);
  
  if (validRatings.length > 0) {
    const sum = validRatings.reduce((a, b) => a + b, 0);
    this.rating = Math.round((sum / validRatings.length) * 10) / 10;
  }
  
  return this.rating;
};

// Mark review as helpful
reviewSchema.methods.markAsHelpful = async function(increment = true) {
  if (increment) {
    this.helpfulVotes += 1;
  } else {
    this.notHelpfulVotes += 1;
  }
  await this.save();
};

// Add company response
reviewSchema.methods.addResponse = async function(text, adminId) {
  this.response = {
    text,
    respondedBy: adminId,
    respondedAt: new Date()
  };
  await this.save();
  return this.response;
};

// Pre-save hook to calculate average if detailed ratings provided
reviewSchema.pre('save', function(next) {
  if (this.isNew && this.ratings && Object.keys(this.ratings).length > 0) {
    this.calculateAverageRating();
  }
  next();
});

// Post-save hook to update car's average rating
reviewSchema.post('save', async function(doc) {
  if (doc.isApproved) {
    const Car = mongoose.model('Car');
    const car = await Car.findById(doc.car);
    if (car) {
      await car.updateAverageRating();
    }
  }
});

// Post-remove hook to update car's average rating
reviewSchema.post('findOneAndDelete', async function(doc) {
  if (doc && doc.isApproved) {
    const Car = mongoose.model('Car');
    const car = await Car.findById(doc.car);
    if (car) {
      await car.updateAverageRating();
    }
  }
});

// Validation: User can only review completed bookings
reviewSchema.pre('validate', async function(next) {
  if (this.isNew) {
    const Booking = mongoose.model('Booking');
    const booking = await Booking.findById(this.booking);
    
    if (!booking) {
      return next(new Error('Booking not found'));
    }
    
    if (booking.status !== 'completed') {
      return next(new Error('Can only review completed bookings'));
    }
    
    if (booking.user.toString() !== this.user.toString()) {
      return next(new Error('User must be the booking owner'));
    }
  }
  next();
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
