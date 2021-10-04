const express = require('express');
const { connectDb } = require('./utils/db');
const cors = require('cors');
const dogApiService = require('./services/dogapi');
const dbService = require('./services/db');

const app = express();

app.use(cors());
app.use(express.json());

const bootstrap = async () => {
    connectDb();
    // get data from DogApi
    await dbService.removeAll();
    const data = await dogApiService.get();
    await dbService.save(data);

    app.get('/', async (req, res) => {
        console.log('routing');
        res.json(await dbService.get());
    });
    app.post('/', async (req, res) => {
        const breedFilter = (req.body.breed) ? req.body.breed : undefined;
        const search = (req.body.search) ? req.body.search : undefined
        res.json(await dbService.get(breedFilter, search));
    })

    app.listen(3200, () => {
        console.log('App is running');
    });
}
bootstrap();
