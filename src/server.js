const data = require("./data.json");

const express = require("express");
const port = 3000;
const app = express();

app.get("/", (req, res) => {
  const minPrice = parseInt(req.query.minPrice) || -Infinity;
  const maxPrice = parseInt(req.query.maxPrice) || Infinity;

  res.json(data);
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
