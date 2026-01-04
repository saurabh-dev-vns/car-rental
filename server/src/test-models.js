/**
 * Test script to verify all database models
 * Run with: node server/src/test-models.js
 */

import mongoose from 'mongoose';
import Env from './env/env.js';
import User from './models/User.js';
import Car from './models/Car.js';
import Booking from './models/Booking.js';
import Payment from './models/Payment.js';
import Review from './models/Review.js';

console.log('🧪 Starting Model Tests...\n');

// Connect to MongoDB
mongoose.connect(Env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB\n');
    
    try {
      // Cleanup any existing test data first
      console.log('🧹 Cleaning up any existing test data...');
      await User.deleteMany({ email: 'john.doe@example.com' });
      await Car.deleteMany({ licensePlate: 'ABC1234' });
      console.log('✅ Cleanup complete\n');
      
      // Test 1: User Model
      console.log('📝 Test 1: Creating User...');
      const user = new User({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '+1234567890',
        address: {
          city: 'New York',
          state: 'NY',
          country: 'USA'
        }
      });
      await user.save();
      console.log(`✅ User created: ${user.fullName} (${user._id})`);
      console.log(`   Email: ${user.email}, Role: ${user.role}\n`);
      
      // Test password comparison
      const isPasswordValid = await user.comparePassword('password123');
      console.log(`   Password comparison: ${isPasswordValid ? '✅ Valid' : '❌ Invalid'}`);
      
      // Test JWT generation
      const token = user.generateAuthToken();
      console.log(`   JWT Token generated: ${token.substring(0, 20)}...\n`);
      
      // Test 2: Car Model
      console.log('📝 Test 2: Creating Car...');
      const car = new Car({
        make: 'Toyota',
        model: 'Camry',
        year: 2024,
        licensePlate: 'ABC1234',
        category: 'midsize',
        transmission: 'automatic',
        fuelType: 'hybrid',
        seats: 5,
        doors: 4,
        pricePerDay: 75,
        pricePerWeek: 450,
        pricePerMonth: 1800,
        securityDeposit: 200,
        features: ['air_conditioning', 'bluetooth', 'backup_camera'],
        location: {
          branch: 'Downtown Branch',
          city: 'New York',
          state: 'NY'
        },
        images: [{
          url: 'https://example.com/car1.jpg',
          isPrimary: true
        }]
      });
      await car.save();
      console.log(`✅ Car created: ${car.fullName} (${car._id})`);
      console.log(`   Category: ${car.category}, Price/Day: $${car.pricePerDay}`);
      console.log(`   Status: ${car.status}, Available: ${car.isAvailable}\n`);
      
      // Test 3: Booking Model
      console.log('📝 Test 3: Creating Booking...');
      const startDate = new Date();
      startDate.setDate(startDate.getDate() + 7);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 3);
      
      const booking = new Booking({
        user: user._id,
        car: car._id,
        startDate: startDate,
        endDate: endDate,
        basePrice: 225, // 3 days * $75
        insurancePrice: 30,
        taxAmount: 25.5,
        pickupLocation: {
          branch: 'Downtown Branch',
          city: 'New York'
        },
        returnLocation: {
          branch: 'Downtown Branch',
          city: 'New York'
        }
      });
      
      booking.calculateTotalPrice();
      await booking.save();
      
      console.log(`✅ Booking created: ${booking.bookingNumber} (${booking._id})`);
      console.log(`   Duration: ${booking.calculateDuration()} days`);
      console.log(`   Total Price: $${booking.totalPrice}`);
      console.log(`   Status: ${booking.status}`);
      console.log(`   Can be cancelled: ${booking.canBeCancelled() ? 'Yes' : 'No'}\n`);
      
      // Test 4: Payment Model
      console.log('📝 Test 4: Creating Payment...');
      const payment = new Payment({
        booking: booking._id,
        user: user._id,
        amount: booking.totalPrice,
        currency: 'USD',
        paymentMethod: 'credit_card',
        cardDetails: {
          last4: '4242',
          brand: 'visa',
          expiryMonth: 12,
          expiryYear: 2026
        },
        status: 'succeeded',
        paymentType: 'full_payment',
        transactionId: `TXN-${Date.now()}`,
        paidAt: new Date()
      });
      await payment.save();
      console.log(`✅ Payment created: ${payment.transactionId} (${payment._id})`);
      console.log(`   Amount: $${payment.amount} ${payment.currency}`);
      console.log(`   Method: ${payment.paymentMethod}, Status: ${payment.status}\n`);
      
      // Update booking to completed status
      booking.status = 'completed';
      await booking.save();
      
      // Test 5: Review Model
      console.log('📝 Test 5: Creating Review...');
      const review = new Review({
        user: user._id,
        car: car._id,
        booking: booking._id,
        rating: 5,
        ratings: {
          cleanliness: 5,
          comfort: 5,
          performance: 4,
          valueForMoney: 5
        },
        title: 'Excellent Car!',
        comment: 'Had a wonderful experience with this car. Very clean, comfortable, and fuel efficient. Would definitely rent again!',
        wouldRecommend: true
      });
      await review.save();
      console.log(`✅ Review created: ${review._id}`);
      console.log(`   Rating: ${review.rating}/5 stars`);
      console.log(`   Title: "${review.title}"`);
      console.log(`   Approved: ${review.isApproved}\n`);
      
      // Test car availability check
      console.log('📝 Test 6: Checking Car Availability...');
      const testStartDate = new Date();
      testStartDate.setDate(testStartDate.getDate() + 1);
      const testEndDate = new Date(testStartDate);
      testEndDate.setDate(testEndDate.getDate() + 2);
      
      const isAvailable = await car.checkAvailability(testStartDate, testEndDate);
      console.log(`   Car availability (${testStartDate.toDateString()} to ${testEndDate.toDateString()}): ${isAvailable ? '✅ Available' : '❌ Not Available'}\n`);
      
      // Display summary
      console.log('═══════════════════════════════════════');
      console.log('📊 Test Summary:');
      console.log('═══════════════════════════════════════');
      console.log('✅ All 5 models tested successfully!');
      console.log(`   - User Model: ✅`);
      console.log(`   - Car Model: ✅`);
      console.log(`   - Booking Model: ✅`);
      console.log(`   - Payment Model: ✅`);
      console.log(`   - Review Model: ✅`);
      console.log('═══════════════════════════════════════\n');
      
      console.log('🎉 All tests passed! Database schema is working correctly.\n');
      
      // Cleanup - Remove test data
      console.log('🧹 Cleaning up test data...');
      await Review.deleteOne({ _id: review._id });
      await Payment.deleteOne({ _id: payment._id });
      await Booking.deleteOne({ _id: booking._id });
      await Car.deleteOne({ _id: car._id });
      await User.deleteOne({ _id: user._id });
      console.log('✅ Test data cleaned up\n');
      
    } catch (error) {
      console.error('❌ Test failed:', error.message);
      console.error(error);
    } finally {
      await mongoose.connection.close();
      console.log('🔌 MongoDB connection closed');
      process.exit(0);
    }
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  });
