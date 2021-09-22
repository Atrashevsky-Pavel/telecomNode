const express = require('express');
const { connectDb } = require('./utils/db');
const cors = require('cors');
const dogApiService = require('./services/dogapi');
const dbService = require('./services/db');

const app = express();

app.use(cors());
app.use(express.json());

async function bootstrap() {
    connectDb();

    let data;
    let breedFilter, search;

    // get data from DogApi
    await dbService.removeAll();
    data = await dogApiService.get();
    await dbService.save(data);


    app.use((req, res, next) => {
        if (req.query.breed) {
            breedFilter = req.query.breed;
        } else {
            breedFilter = undefined;
        }
        if (req.query.q) {
            search = req.query.q;
        } else {
            search = undefined;
        }
        next();
    });

    app.get('/', async (req, res) => {
        console.log('routing');
        res.json(await dbService.get(breedFilter, search));
    });

    app.listen(3200, () => {
        console.log('App is running');
    });
}
bootstrap();
