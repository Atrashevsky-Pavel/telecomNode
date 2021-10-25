const { default: axios } = require('axios');
const dogApi = 'https://dog.ceo/api/breeds/image/random/50';
const count = 100;

const getDataFromDogsApi = async () => {
  const data = [];
  for (let i = 0; i < count / 50; i++) {
    data.push(...(await axios.get(dogApi)).data.message);
  }
  return data;
};

const breedParseUrl = (url) => {
  const pathname = new URL(url).pathname;
  const match = pathname.match(/[^/?]*[^/?]/g);
  return {
    breed: match[1],
    title: match[2].split('.')[0],
    image: url,
  };
};

const get = async () => {
  const data = await getDataFromDogsApi();
  const newData = { breeds: [], dogs: [] };
  data.forEach((item) => {
    const objUrl = breedParseUrl(item);
    newData.breeds.push(objUrl.breed);
    newData.dogs.push(objUrl);
  });
  return newData;
};

module.exports = { get };
