const data = require("./data.json");

const express = require("express");
const port = 3000;
const app = express();

app.get("/", (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
