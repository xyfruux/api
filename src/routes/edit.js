const express = require("express");
const router = express.Router();
const Item = require("../models/Item.js");

// TESTING
router.post("/create", (req, res) => {
  const { authorization } = req.headers;

  if (authorization === process.env.API_KEY) {
    const data = req.body;
    const newItem = new Item({
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
    });
    console.log(data);
    console.log(newItem);
    res.status(200).json({ message: "TESTING", auth: "Accepted" });
  } else {
    res.status(401).json({ message: "TESTING", auth: "Unaccepted" });
  }
});
// TESTING
router.delete("/delete", (req, res) => {
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

module.exports = router;
