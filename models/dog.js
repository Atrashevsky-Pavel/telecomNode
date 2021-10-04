const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dog = new Schema(
    {
        breedId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Breed',
        },
        title: String,
        image: String,
    },
    { collection: 'dogs' }
);


const toResponse = (dog) => {
    const { id, breedId, title, image } = dog;
    return { id, breedId, title, image };
};

module.exports = {
    Dog: mongoose.model('dogs', Dog),
    toResponse,
};