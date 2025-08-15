const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const app = express();
connectToMongo();

app.use(express.json());
app.use(cors());
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}))

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});