const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

function mongoConnect() {
    mongoose.connect(URI)
        .then(() => {
            console.log("connected to DB");
        }).catch((error) => {
            console.log("Error in connecting DB : ", error);
        })
}

module.exports = mongoConnect;