const path = require("path");
const { User } = require(path.join(__dirname, "..", "..", "models"));
const { ctrlWrapper, HttpError } = require(path.join(
  __dirname,
  "..",
  "..",
  "helpers"
));

const logout = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findByIdAndUpdate(_id, { token: "" });
  if (!user) {
    throw HttpError(401);
  }

  return res.status(204).json({ message: "No Content" });
};

module.exports = { logout: ctrlWrapper(logout) };
