const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Breed = new Schema(
    {
        title: String,
    },
    { collection: 'breeds' }
);

const toResponse = (breed) => {
    const { id, title } = breed;
    return { id, title };
};

module.exports = {
    Breed: mongoose.model('breeds', Breed),
    toResponse,
};
