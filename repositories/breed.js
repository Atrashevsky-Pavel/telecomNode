const { Breed } = require('../models/breed');

const getAll = async () => Breed.find({});

const get = async (id) => Breed.findById(id);

const save = async (data) => Breed.insertMany(data);

const removeAll = async () => Breed.deleteMany();

module.exports = { getAll, get, save, removeAll };
