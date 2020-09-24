const router = require('express').Router();
const db = require('./database.js');
const Listing = require('./schema.js');

// Get request
router.route('/api/listings').get((req, res) => {
  Listing.find()
    .then((listings) => { console.log(listings); res.status(200).send(listings) })
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

module.exports = router;
