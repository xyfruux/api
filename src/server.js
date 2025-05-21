const data = require("./data.json");

const express = require("express");
const port = 3000;
const app = express();

app.get("/", (req, res) => {
  const minPrice = parseInt(req.query.minPrice);
  const maxPrice = parseInt(req.query.maxPrice);
  res.json(data);
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
