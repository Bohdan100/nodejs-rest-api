const path = require("path");
const { ctrlWrapper, HttpError } = require(path.join(
  __dirname,
  "..",
  "..",
  "helpers"
));

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  if (!email && !subscription) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ email, subscription });
};

module.exports = { getCurrent: ctrlWrapper(getCurrent) };
