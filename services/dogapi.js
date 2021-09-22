const { default: axios } = require('axios');
const dogApi = 'https://dog.ceo/api/breeds/image/random/50';

const getDataFromDogsApi = async () => {
    let requests = [];
    for (let i = 0; i < 2; i++) {
        requests.push(axios.get(dogApi));
    }
    return Promise.all(requests);
};

const prepareDataFromDogApi = async (data) => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].data.message.length; j++) {
            result.push(breedParseUrl(data[i].data.message[j]));
        }
    }
    return result;
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
    const dataFromApi = await getDataFromDogsApi();
    const data = await prepareDataFromDogApi(dataFromApi);
    return data;
};

module.exports = { get };
