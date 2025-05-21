const data = require("./data.json");

const express = require("express");
const port = 3000;
const app = express();

app.get("/", (req, res) => {
  const { minPrice, maxPrice } = req.query;

  const filteredItems = data.filter((item) => {
    return (
      (!minPrice || item.price >= minPrice) &&
      (!maxPrice || item.price <= maxPrice)
    );
  });

  console.log(filteredItems);

  res.json(data);
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
