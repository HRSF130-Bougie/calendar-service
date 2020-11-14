/* eslint-disable no-console */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const listingSchema = new Schema({
  listing_id: Number,
  calendar: [
    [{
      date: { year: Number, month: Number, day: Number },
      booked: Boolean,
      price: Number,
      minimumNights: Number,
    }],
  ],
  reservations: [
    {
      checkIn: Object,
      checkOut: Object,
      guests: {
        adults: Number,
        children: Number,
        infants: Number,
      },
      fees: {
        cleaningFee: Number,
        pricesByNight: Array,
        basePrice: Number,
        nightCount: Number,
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
