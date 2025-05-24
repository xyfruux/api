const express = require("express");
const router = express.Router();
const Item = require("../models/Item.js");

router.post("/create", (req, res) => {
  const { authorization } = req.headers;

  if (authorization !== process.env.API_KEY) {
    res.status(401).json({ message: "Not authorized." });
    return;
  } else {
    const data = req.body;
    const newItem = new Item({
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
    });

    newItem
      .save()
      .then(() => {
        res.status(200).json({
          message: "Item created successfully!",
        });
      })
      .catch((err) => {
        console.error(`Error creating: ${err}`);
        res.status(500).json({
          message: "Something went wrong creating. Please try again later.",
        });
      });
  }
});

router.delete("/delete", (req, res) => {
  const { authorization } = req.headers;
  const { id } = req.body;

  if (authorization !== process.env.API_KEY) {
    res.status(401).json({ message: "Not authorized to delete items." });
  } else {
    Item.deleteOne({ _id: id })
      .then(() => {
        res.status(200).json({ message: "Item deleted successfully!" });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong deleting. Please try again later.",
        });
      });
  }
});

module.exports = router;
