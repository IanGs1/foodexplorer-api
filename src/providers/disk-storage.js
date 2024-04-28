const fs = require("node:fs");
const path = require("node:path");

const uploadConfig = require("../config/upload-config");

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  };

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    }
    catch {
      return;
    };

    await fs.promises.unlink(filePath);
  };
};

module.exports = DiskStorage;