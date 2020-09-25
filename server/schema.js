/* eslint-disable no-console */
const mongoose = require('mongoose');
const dayjs = require('dayjs');
const faker = require('faker');

const { Schema } = mongoose;

const listingSchema = new Schema({
  listing_id: Number,
  days: [
    {
      date: Date,
      // eslint-disable-next-line no-undef
      booked: Boolean,
      price: Number,
      minimumNights: Number,
    },
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
});

const Listing = mongoose.model('Listing', listingSchema);

const reSeed = async (callback) => {
  try {
    // Delete existing documents
    await Listing.deleteMany({});

    // Create 100 new records
    for (let listCount = 1; listCount <= 100; listCount += 1) {
      const daysArray = [];

      for (let dayCount = 0; dayCount <= 182; dayCount += 1) {
        // Construct day object to be pushed to array, 6 months worth of days
        const day = {
          date: dayjs().startOf('month').add(dayCount, 'day').toDate(),
          booked: faker.random.boolean(),
          price: 100,
          minimumNights: 1,
        };

        // Make weekends more expensive
        if (day.date.getDay() >= 5) {
          day.price = 120;
        }

        // Make a two day minimum on Fridays
        if (day.date.getDay() === 5) {
          day.minimumNights = 2;
        }
        daysArray.push(day);
      }

      const newListing = new Listing({
        listing_id: listCount,
        days: daysArray,
      });

      newListing.save();
    }
  } catch (error) {
    console.error(error);
    callback(error);
  } finally {
    callback(null, 'new records created');
  }
};

module.exports = {
  Listing, reSeed,
};
