require("dotenv").config();

require("express-async-errors");
const AppError = require("./utils/AppError");

const express = require("express");
const appRoutes = require("./routes");

const { UPLOAD_FOLDER } = require("./config/upload");

const app = express();

app.use(express.json());

app.use(appRoutes)

app.use("/files", express.static(UPLOAD_FOLDER));

app.use((error, request, reply, next) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).json({
      status: "error",
      message: error.message,
    })
  }

  return reply.status(500).json({
    status: "error",
    message: "Internal Server Error",
  })
})

app.listen(3333, () => {
  console.log("HTTP server listening on: http://localhost:3333 🚀");
})