const data = require("./data.json");

const express = require("express");
const port = 3000;
const app = express();

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("Connected to database"))
  .catch((err) => `Database error: ${err}`);

const itemSchema = new mongoose.Schema({
  title: String,
  price: Number,
  description: String,
  category: [String],
});

require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  const { minPrice, maxPrice, category } = req.query;

  const filteredItems = data.filter((item) => {
    return (
      (!minPrice || item.price >= minPrice) &&
      (!maxPrice || item.price <= maxPrice) &&
      (!category || item.category == category)
    );
  });

  res.status(200).json(filteredItems);
});
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
