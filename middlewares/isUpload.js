const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const path = require("path");
const STATIC_DIR = path.join(__dirname, "..", "tmp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, STATIC_DIR);
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");

    if (extension === "png" || extension === "jpg") {
      cb(null, `${uuidv4()}.${extension}`);
    } else {
      throw new Error("Not valid type for image");
    }
  },
  limits: { filesize: 2048 },
});

const upload = multer({ storage: multerConfig });

module.exports = { isUpload: upload.single("avatar") };
