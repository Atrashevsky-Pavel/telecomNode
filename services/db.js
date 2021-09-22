const breedRepo = require('../repositories/breed');
const dogRepo = require('../repositories/dog');

const get = async (filter = '', search = '') => {
    let breedFilter = {};
    let dogFilter = {};
    if (filter) {
        breedFilter = {
            title: filter,
        };
    }
    let breeds = await breedRepo.getAll(breedFilter);
    let breedsId = breeds.map(function (curr) {
        return curr._id;
    });
    if (breedsId.length) {
        dogFilter.breedId = breedsId;
    }
    if (search.length) {
        dogFilter.title = new RegExp(search, 'i');
    }
    let dogs = await dogRepo.getAll(dogFilter);
    let result = dogs.map(function (curr) {
        return {
            breed: breeds.find((el) => curr.breedId + '' == el._id + ''),
            title: curr.title,
            image: curr.image,
        };
    });
    return result;
};

const save = async (data) => {
    let breedsData = data.map(function (curr) {
        return { title: curr.breed };
    });
    let breeds = await breedRepo.save(breedsData);
    let dogsData = data.map(function (curr) {
        return {
            breedId: breeds.find((el) => curr.breed == el.title)._id,
            title: curr.title,
            image: curr.image,
        };
    });
    await dogRepo.save(dogsData);
};

const removeAll = async () => {
    await breedRepo.removeAll();
    await dogRepo.removeAll();
};

module.exports = { get, save, removeAll };
