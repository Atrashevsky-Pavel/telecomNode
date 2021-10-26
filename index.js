const express = require('express');
const { connectDb } = require('./utils/db');
const cors = require('cors');
const dogApiService = require('./services/dogapi');
const dbService = require('./services/db');

const app = express();
app.use(cors());
app.use(express.json());

const bootstrap = async () => {
  await connectDb();
  await dbService.removeAll();
  const data = await dogApiService.get();
  await dbService.save(data);

  app.get('/breeds', async (req, res) => {
    res.json(await dbService.getBreeds());
  });
  app.post('/dogs', async (req, res) => {
    res.json(await dbService.getDogs(req.body));
  });
  app.listen(3200, () => {
    console.log('App is running');
  });
};

(async () => {
  await bootstrap();
})();
