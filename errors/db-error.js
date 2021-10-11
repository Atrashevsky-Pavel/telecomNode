const { NOT_FOUND } = require('http-status-codes');

class CustomError extends Error {
    constructor({ status = NOT_FOUND, message }) {
        super(message);
        this.status = status;
    }
}

module.exports = { CustomError };