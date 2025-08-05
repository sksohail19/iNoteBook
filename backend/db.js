const mongoose = require("mongoose")

const connectToMongo = () => {
    mongoose.connect("mongodb://localhost:27017/inotebook", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log(err))
}

module.exports = connectToMongo