const { default: axios } = require('axios');
const dogApi = 'https://dog.ceo/api/breeds/image/random/50';
const count = 100;

const getDataFromDogsApi = async () => {
    const result = await axios.get(dogApi);
    return result.data;
};

const prepareDataFromDogApi = async (data) => {
    return data.map((item) => breedParseUrl(item));
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

const getData = async (arr) => {
    const dataFromApi = await getDataFromDogsApi();
    const data = await prepareDataFromDogApi(dataFromApi.message);
    let result = arr.concat(data);
    if (result.length < count) {
        result = await getData(result);
    }
    return result;
};

const get = async () => {
    const data = await getData([]);
    return data;
};

module.exports = { get };
