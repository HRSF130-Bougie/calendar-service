const router = require('express').Router();
const db = require('./database.js');
const schema = require('./schema.js');

// Get request from the client
router.route('/api/listings').get((req, res) => {
  schema.Listing.find()
    .then((listings) => res.status(200).send(listings))
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

// Get request from postman to re-seed
router.route('/api/reseed').get((req, res) => {
  schema.reSeed((error, success) => {
    if (error) {
      res.status(400).send(`Something went wrong ${error}`);
    } else {
      res.status(200).send(success);
    }
  });
});

module.exports = router;
