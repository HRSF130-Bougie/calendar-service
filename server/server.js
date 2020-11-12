/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router.js');
// const db = require('../database/connectToDatabaseLocal.js');
const db = require('../database/connectToDatabaseCompose.js');

const app = express();
const port = 3002;
app.use(cors());

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../client/dist')));
app.use('/api/booking', router);

app.listen(port, () => {
  console.log(`Calendar service listening at http://localhost:${port}`);
});
