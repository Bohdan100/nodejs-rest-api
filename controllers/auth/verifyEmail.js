const path = require("path");
const { User } = require(path.join(__dirname, "..", "..", "models"));
const { ctrlWrapper, HttpError } = require(path.join(
  __dirname,
  "..",
  "..",
  "helpers"
));

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    next(HttpError(404, "User not found"));
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({ message: "Verification successful" });
};

module.exports = { verifyEmail: ctrlWrapper(verifyEmail) };
