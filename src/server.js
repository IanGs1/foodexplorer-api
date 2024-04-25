const express = require("express");

const app = express();

app.listen(3333, () => {
  console.log("HTTP Server listening on: http://localhost:3333 🚀");
});