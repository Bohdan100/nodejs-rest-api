const path = require("path");
const { User } = require(path.join(__dirname, "..", "..", "models"));
const { ctrlWrapper } = require(path.join(__dirname, "..", "..", "helpers"));
const { sendEmail } = require(path.join(
  __dirname,
  "..",
  "..",
  "services",
  "email"
));

const { BASE_URL } = process.env;

const resendVerify = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "missing required field email" });
  }

  const user = await User.findOne({ email });
  const verificationToken = user.verificationToken;

  if (verificationToken === null) {
    return res
      .status(400)
      .json({ message: "Verification has already been passed" });
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
    text: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  return res.status(200).json({ message: "Verification email sent" });
};

module.exports = { resendVerify: ctrlWrapper(resendVerify) };
