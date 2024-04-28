const multer = require("multer");

const path = require("node:path");
const crypto = require("node:crypto");

const tmpFolder = path.resolve(__dirname, "..", "..", "tmp");

const uploadsFolder = path.resolve(tmpFolder, "uploads");

const multerConfig = {
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (_, file, callback) => {
      const fileHash = crypto.randomBytes(7).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

module.exports = {
  tmpFolder,
  uploadsFolder,
  multerConfig,
};