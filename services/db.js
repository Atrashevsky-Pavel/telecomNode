const breedRepo = require('../repositories/breed');
const dogRepo = require('../repositories/dog');

const get = async (filter = '', search = '') => {
    console.log(filter);
    const breedFilter = (filter) ? {title: filter} : {};
    const breeds = await breedRepo.getAll(breedFilter);
    const id = (filter) ? String(breeds[0]._id) : undefined;
    const dogFilter = (id)? {breedId: {_id: id}} : {};
    if (search) {
        dogFilter.title = search;
    }
    let dogs = await dogRepo.getAll(dogFilter);
    const result = dogs.map( (item) => {
        return {
            breed: breeds.find((el) => item.breedId + '' == el._id + ''),
            title: item.title,
            image: item.image,
        };
    });
    return result;
};

const save = async (data) => {
    const breedsData = [...new Set(data.map(value => value.breed))].map((item) => {return { title: item }});
    const breeds = await breedRepo.save(breedsData);
    const dogsData = data.map((item) => {
        return {
            breedId: breeds.find((el) => item.breed == el.title)._id,
            title: item.title,
            image: item.image,
        };
    });
    await dogRepo.save(dogsData);
};

const removeAll = async () => {
    await breedRepo.removeAll();
    await dogRepo.removeAll();
};

module.exports = { get, save, removeAll };
