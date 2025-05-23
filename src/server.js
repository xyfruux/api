const data = require("./data.json");

const express = require("express");
const port = 3000;
const app = express();

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/data")
  .then(() => console.log("Connected to database"))
  .catch((err) => `Database error: ${err}`);

const itemSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: [String],
});

const Item = mongoose.model("Item", itemSchema);

async function run() {
  const items = await Item.find();

  console.log(items);
}
run();

const apiRouter = require("./routes/api.js");
const editRouter = require("./routes/edit.js");

app.use("/api", apiRouter);
app.use("/edit", editRouter);

require("dotenv").config();

app.use(express.json());

// TESTING
app.post("/create", (req, res) => {
  const { authorization } = req.headers;
  if (authorization === process.env.API_KEY) {
    res.status(200).json({ message: "TESTING", auth: "Accepted" });
  } else {
    res.status(401).json({ message: "TESTING", auth: "Unaccepted" });
  }
});
// TESTING
app.delete("/delete", (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.query;

  if (authorization === process.env.API_KEY) {
    console.log(id);
    res
      .status(200)
      .json({ message: `TESTING. DELETE ID: ${id}`, auth: "Accepted" });
  } else {
    res
      .status(401)
      .json({ message: `TESTING. DELETE ID: ${id}`, auth: "Unaccepted" });
  }
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
