import mongoose from "mongoose";

const MONGO_URI = 'mongodb://localhost:27017/travelhop'

mongoose
    .connect(MONGO_URI)
    .then((x) => {
        const dbName = x.connections[0].name;
        console.log(`Connected to Mongo! Database name: "${dbName}"`);
    })
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    });
