/* eslint-disable no-console */
const dayjs = require('dayjs');
const faker = require('faker');
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
// eslint-disable-next-line no-unused-vars
// const db = require('./connectToDatabaseCompose.js');
const schema = require('./schema.js');

const reSeed = async () => {
  let listCount = 1;
  try {
    // Delete existing documents
    await schema.Listing.deleteMany({});
    for (listCount; listCount <= 100; listCount += 1) {
      const daysArray = [];
      const randomPrice = Math.floor(faker.random.number({ min: 75, max: 450 }));
      const weekendPricing = faker.random.boolean();
      const randomRating = faker.finance.amount(3, 4, 2)
      const randomReviews = faker.random.number({ min: 5, max: 1500 });

      // eslint-disable-next-line func-names
      const getLastDay = function (yy, mm) {
        return new Date(yy, mm + 1, 0).getDate();
      };

      for (let month = 1; month <= 6; month += 1) {
        // Construct day object to be pushed to array, 6 months worth of days

        const startDay = dayjs.utc().startOf('month').add(month - 1, 'month').toDate();
        const startMonth = startDay.getMonth();
        const startYear = startDay.getFullYear();
        const lastDay = getLastDay(startYear, startMonth);

        const monthArray = [];

        for (let day = 1; day <= lastDay; day += 1) {
          const date = {
            date: dayjs(startDay).utc().add(day - 1, 'day').add(12, 'hours').toDate(),
            booked: faker.random.boolean(),
            price: randomPrice,
            minimumNights: 1,
          };

          if (weekendPricing) {
            // Make weekends more expensive
            if (date.date.getDay() >= 5) {
              date.price = Math.floor(Number(date.price * 1.2));
            }

            // Make a two day minimum on Fridays
            if (date.date.getDay() === 5) {
              date.minimumNights = 2;
            }
          }
          // Set service fee
          date.serviceFee = Math.floor(Number(date.price * 0.142));
          monthArray.push(date);
        }
        daysArray.push(monthArray);
      }

      const newListing = new schema.Listing({
        listing_id: listCount,
        days: daysArray,
        cleaningFee: faker.random.number({ min: 50, max: 100 }),
        weekendPricing,
        lowestPrice: randomPrice,
        rating: randomRating,
        reviews: randomReviews,
      });

      newListing.save();
    }
  } catch (error) {
    console.error(error);
  } finally {
    console.log(`${listCount - 1} new listings created.`);
  }
};

// reSeed();

module.exports = reSeed;
