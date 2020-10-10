const mongoose = require('mongoose');
const seed = require('./seedCompose');

const connectionString = 'mongodb://database/fec';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const { connection } = mongoose;

// eslint-disable-next-line no-console
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  // eslint-disable-next-line no-console
  seed();
  console.log(`MongoDB database connection established successfully at ${connectionString}`);
});


module.exports = connection;
