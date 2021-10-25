const { Dog } = require('../models/dog');

const getAll = async (dogFilter) => Dog.find(dogFilter);

const get = async (id) => Dog.findById(id);

const save = async (data) => Dog.insertMany(data);

const removeAll = async () => Dog.deleteMany();

module.exports = { getAll, get, save, removeAll };
