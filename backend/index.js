const connectToMongo = require("./db");
const express = require("express");
const app = express();
connectToMongo();

app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});