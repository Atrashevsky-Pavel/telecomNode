const breedRepo = require('../repositories/breed');
const dogRepo = require('../repositories/dog');

const getBreeds = async () => {
  return await breedRepo.getAll();
};

const getDogs = async ({ breedId = undefined, title = undefined }) => {
  const filter = {};
  if (breedId) {
    filter.breedId = breedId;
  } else if (title) {
    filter.title = title;
  }
  return await dogRepo.getAll(filter);
};

const save = async ({ breeds, dogs }) => {
  const breedsData = await breedRepo.save(
    [...new Set(breeds)].map((item) => {
      return { title: item };
    })
  );
  const dogsData = dogs.map((item) => {
    return {
      breedId: breedsData.find((el) => item.breed === el.title)._id,
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

module.exports = { getBreeds, getDogs, save, removeAll };
