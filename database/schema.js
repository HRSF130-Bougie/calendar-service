/* eslint-disable no-console */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const listingSchema = new Schema({
  listing_id: Number,
  days: [
    [{
      date: Date,
      booked: Boolean,
      price: Number,
      minimumNights: Number,
    }],
  ],
  reservations: [
    {
      res_id: Number,
      checkIn: Number,
      checkOut: Number,
      guests: {
        adults: Number,
        children: Number,
        infants: Number,
      },
    },
  ],
  weekendPricing: Boolean,
  cleaningFee: Number,
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = { Listing };
