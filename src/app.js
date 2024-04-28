const express = require("express");

const app = express();
const appRoutes = require("./routes");

const uploadConfig = require("./config/upload-config");

// Accept JSON Body
app.use(express.json());

app.use(appRoutes);

app.use("/files", express.static(uploadConfig.uploadsFolder));

module.exports = app;