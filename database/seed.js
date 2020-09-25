const dayjs = require('dayjs');
const faker = require('faker');
const db = require('./connectToDatabase.js');
const schema = require('./schema.js');

const reSeed = async () => {
  try {
    // Delete existing documents
    await schema.Listing.deleteMany({});
  } catch (error) {
    console.error(error);
  } finally {
    // Create 100 new records
    let listCount = 1;
    for (listCount; listCount <= 100; listCount += 1) {
      const daysArray = [];
      const randomPrice = faker.random.number({ min: 75, max: 450 });

      for (let dayCount = 0; dayCount <= 30; dayCount += 1) {
        // Construct day object to be pushed to array, 6 months worth of days
        const day = {
          date: dayjs().startOf('month').add(dayCount, 'day').toDate(),
          booked: faker.random.boolean(),
          price: randomPrice,
          servicefee: 0,
          minimumNights: 1,
        };

        // Make weekends more expensive
        if (day.date.getDay() >= 5) {
          day.price = Number((day.price * 1.2).toFixed(2));
        }

        // Make a two day minimum on Fridays
        if (day.date.getDay() === 5) {
          day.minimumNights = 2;
        }

        // Set service fee
        day.serviceFee = Number((day.price * 0.142).toFixed(2));
        daysArray.push(day);
      }

      const newListing = new schema.Listing({
        listing_id: listCount,
        days: daysArray,
        cleaningFee: faker.random.number({ min: 50, max: 100 }),
      });

      newListing.save();
    }
    console.log(`${listCount - 1} new listings created.`);
  }
};

reSeed();
