const express = require("express");
const port = 3000;
const app = express();

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/data")
  .then(() => console.log("Connected to database"))
  .catch((err) => `Database error: ${err}`);

const apiRouter = require("./routes/api.js");
const editRouter = require("./routes/edit.js");

app.use("/api", apiRouter);
app.use("/edit", editRouter);

require("dotenv").config();

app.use(express.json());

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
