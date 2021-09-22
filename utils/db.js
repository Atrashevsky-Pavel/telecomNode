const mongoose = require('mongoose');
const MONGO_CONNECTION_STRING =
    'mongodb://localhost:27017/app';

const connectDb = () => {
    mongoose.connect(MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('db connect');
};

module.exports = { connectDb };
