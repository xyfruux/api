const express = require("express");
const port = 3000;
const app = express();

app.get("/", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Blue Mouse",
      price: 10.99,
      description: "A blue mouse with a sleek design.",
    },
  ]);
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
