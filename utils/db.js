const mongoose = require('mongoose');
const { CustomError } = require('../errors/db-error');
const { BAD_REQUEST } = require('http-status-codes');
const MONGO_CONNECTION_STRING =
    'mongodb+srv://admin:18Wz6i7x3MXyW7Yr@cluster0.zpqmd.mongodb.net/atrashevsky?retryWrites=true&w=majority';

const connectDb = connect => {
    mongoose.connect(MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', () => {
        throw new CustomError({
            status: BAD_REQUEST,
            message: 'DB Error!'
        });
    }).once(
        'open',
        async () => {
            console.log('db connect');
            connect();
        }
    );
};

module.exports = { connectDb };
