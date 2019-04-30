const mongoose = require("mongoose");

const MONGO_PATH = process.env.MONGO_PATH || "localhost";
const MONGO_PORT = process.env.MONGO_PORT || 27017;

const mongoUri = `mongodb://${MONGO_PATH}:${MONGO_PORT}/hello`;
const connection = mongoose.createConnection(
    mongoUri,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    () => {
    console.log('MongoDB is connected.');
});

module.exports = connection;


