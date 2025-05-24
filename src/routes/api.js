const express = require("express");
const router = express.Router();

const Item = require("../models/Item.js");

router.get("/", async (req, res) => {
  const { minPrice, maxPrice, category } = req.query;
  const items = await Item.find({
    ...(minPrice && { price: { $gte: minPrice } }),
    ...(maxPrice && { price: { $lte: maxPrice } }),
    ...(category && { category: { $in: [category] } }),
  });

  res.status(200).json(items);
});

module.exports = router;
