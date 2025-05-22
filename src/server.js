const data = require("./data.json");

const express = require("express");
const port = 3000;
const app = express();

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
app.put("/create", (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "TESTING" });
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
