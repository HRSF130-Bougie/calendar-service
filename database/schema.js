/* eslint-disable no-console */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const listingSchema = new Schema({
  listing_id: Number,
  days: [
    [{
      date: { year: Number, month: Number, Day: Number },
      booked: Boolean,
      price: Number,
      minimumNights: Number,
    }],
  ],
  reservations: [
    {
      checkIn: String,
      checkOut: String,
      guests: {
        adults: Number,
        children: Number,
        infants: Number,
      },
      fees: {
        cleaningFee: Number,
        basePrice: Number,
        serviceFee: Number,
        taxes: Number,
        total: Number,
      },
    },
  ],
  weekendPricing: Boolean,
  cleaningFee: Number,
  lowestPrice: Number,
  rating: Number,
  reviews: Number,
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = { Listing };
