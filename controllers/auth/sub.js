const path = require("path");
const { User } = require(path.join(__dirname, "..", "..", "models"));
const { ctrlWrapper, HttpError } = require(path.join(
  __dirname,
  "..",
  "..",
  "helpers"
));

const sub = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(_id, { subscription });
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ message: `Success update: ${subscription}` });
};

module.exports = { sub: ctrlWrapper(sub) };
