const router = require("express").Router();
const schema = require("../database/schema.js");

/* eslint-disable no-console */
const dayjs = require("dayjs");
const faker = require("faker");
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);

// POST Request (for seeding)
router.route("/listings/").post((req, res) => {
  let listCount = 1;
  let globalArray = [];
  try {
    for (listCount; listCount <= 100; listCount += 1) {
      const daysArray = [];
      const randomPrice = Math.floor(
        faker.random.number({ min: 75, max: 450 })
      );
      const weekendPricing = faker.random.boolean();
      const randomRating = faker.finance.amount(3, 4, 2);
      const randomReviews = faker.random.number({ min: 5, max: 1500 });

      // eslint-disable-next-line func-names
      const getLastDay = function (yy, mm) {
        return new Date(yy, mm + 1, 0).getDate();
      };

      for (let month = 1; month <= 6; month += 1) {
        // Construct day object to be pushed to array, 6 months worth of days

        const startDay = dayjs()
          .startOf("month")
          .add(month - 1, "month")
          .toDate();
        const startMonth = startDay.getMonth();
        const startYear = startDay.getFullYear();
        const lastDay = getLastDay(startYear, startMonth);

        const monthArray = [];

        for (let day = 1; day <= lastDay; day += 1) {
          const newDay = dayjs(startDay)
            .utc()
            .add(day - 1, "day")
            .add(6, "hours")
            .toDate();
          const date = {
            date: newDay,
            booked: faker.random.boolean(),
            price: randomPrice,
            minimumNights: 1,
          };

          if (weekendPricing) {
            // Make weekends more expensive
            if (newDay.getDay() >= 5) {
              date.price = Math.floor(Number(date.price * 1.2));
            }

            // Make a two day minimum on Fridays
            if (newDay.getDay() === 5) {
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

      newListing.save((err) => {
        globalArray.push(newListing);

        if (globalArray.length === 100) {
          res.status(201).send(globalArray);
        }
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    console.log(`${listCount - 1} new listings created.`);
  }
});

// **GET Request (for getting all listings)
router.route("/listings/").get((req, res) => {
  schema.Listing.find()
    .then((listings) => res.status(200).send(listings))
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

// **GET Request (for getting listing ID)
router.route("/listing/:listingId").get((req, res) => {
  const { listingId } = req.params;
  schema.Listing.findOne({ listing_id: listingId })
    .then((listing) => res.status(200).send(listing))
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

// **PATCH Request (for change in selected date)
router.route("/listing/reservation/:listingId").patch((req, res) => {
  const { listingId } = req.params;
  const newListing = req.body;
  const days = req.body;

  schema.Listing.updateOne(
    { listing_id: listingId },
    { $push: { reservations: newListing }, days },
    { returnNewDocument: true }
  )
    .then((updateMetadata) => {
      res.status(200).send({
        success: true,
        updatedCount: updateMetadata.nModified,
      });
    })
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

// DELETE Request (for before reseeding)
router.route("/listings/").delete((req, res) => {
  schema.Listing.deleteMany({})
    .then((deletionMetadata) => {
      res.status(200).send({
        success: true,
        deletedCount: deletionMetadata.deletedCount,
      });
    })
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

module.exports = router;
