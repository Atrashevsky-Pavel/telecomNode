const mongoose = require('mongoose');
const MONGO_CONNECTION_STRING = 'mongodb://localhost:27017/app';

const connectDb = async () => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', async () => {
    console.log('db error');
  }).once('open', async () => {
    console.log('db connect');
  });
};

module.exports = { connectDb };
