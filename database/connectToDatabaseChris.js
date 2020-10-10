const mongoose = require('mongoose');
const seed = require('./seedCompose');

const connectionString = 'mongodb://172.17.0.2:27017/fec';

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
  console.log(`MongoDB database connection established successfully at ${connectionString}`);
  seed();
});


module.exports = connection;
