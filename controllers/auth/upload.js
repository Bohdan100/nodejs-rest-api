const fs = require("fs/promises");
const Jimp = require("jimp");

const path = require("path");
const { User } = require(path.join(__dirname, "..", "..", "models"));
const { ctrlWrapper } = require(path.join(__dirname, "..", "..", "helpers"));

const upload = async (req, res) => {
  const { _id } = req.user;
  const { path: staticPath, originalname } = req.file;

  const avatarsDir = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "avatars",
    `${_id}`
  );

  const filename = `${_id}${originalname}`;
  const avatarsPath = path.join(avatarsDir, filename);

  const avatar = await Jimp.read(staticPath);
  const avatarWithSize = avatar.resize(250, 250);

  await avatarWithSize.writeAsync(avatarsPath);
  await fs.unlink(staticPath);

  const avatarURL = path.join(avatarsPath);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
};

module.exports = { upload: ctrlWrapper(upload) };
