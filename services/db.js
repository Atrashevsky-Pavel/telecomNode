const breedRepo = require('../repositories/breed');
const dogRepo = require('../repositories/dog');

const getQuantityButton = (pageSize, lengthData) => {
  if (pageSize > lengthData) {
    return 0;
  } else if (pageSize < lengthData) {
    return Math.ceil(lengthData / pageSize);
  } else {
    return 0;
  }
};

const getStartIndexAndEndIndex = (page, pageSize, lengthData) => {
  const start = pageSize * (page - 1);
  const end = page * pageSize > lengthData ? lengthData : page * pageSize;
  return pageSize < lengthData ? { start, end } : false;
};

const getDogs = async ({
  pagination = { page: 1, pageSize: 10 },
  filter = {},
}) => {
  const data = await dogRepo.getAll(filter);
  const quantityButtons = getQuantityButton(pagination.pageSize, data.length);
  const indices = getStartIndexAndEndIndex(
    pagination.page,
    pagination.pageSize,
    data.length
  );
  return indices
    ? {
        data: data.slice(indices.start, indices.end),
        quantityButtons,
      }
    : {
        data,
        quantityButtons,
      };
};

const getBreeds = async () => {
  return await breedRepo.getAll();
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
