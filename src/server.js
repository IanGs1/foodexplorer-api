require("dotenv/config");

const app = require("./app.js");

app.listen(3333, () => {
  console.log("HTTP Server listening on: http://localhost:3333 🚀");
});