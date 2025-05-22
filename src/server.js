const data = require("./data.json");

const express = require("express");
const port = 3000;
const app = express();

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
app.put("/create", (req, res) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (authorization === process.env.TEST) {
    res.status(200).json({ message: "TESTING", auth: "Accepted" });
  } else {
    res.status(401).json({ message: "TESTING", auth: "Unaccepted" });
  }
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
