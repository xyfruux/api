const express = require("express");
const router = express.Router();

const User = require("../models/Item.js");

const data = require("../data.json");

router.get("/", (req, res) => {
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
router.get("/test", async (req, res) => {
  const items = await User.find();

  console.log(items);

  res.json(items);
});

module.exports = router;
