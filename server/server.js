const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const orderRouter = require('./router.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, '../dist')));
app.use('/', orderRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
