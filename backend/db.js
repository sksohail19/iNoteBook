const mongoose = require("mongoose")

const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.log(err))
}

module.exports = connectToMongo