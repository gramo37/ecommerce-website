const mongoose = require("mongoose");

const connectToDatabase = () => {
    mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log("Connected to database")
    })
}

module.exports = connectToDatabase;