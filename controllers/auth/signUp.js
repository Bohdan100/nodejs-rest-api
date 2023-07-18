const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const path = require("path");
const { User } = require(path.join(__dirname, "..", "..", "models"));
const { ctrlWrapper, HttpError } = require(path.join(
  __dirname,
  "..",
  "..",
  "helpers"
));
const { sendEmail } = require(path.join(
  __dirname,
  "..",
  "..",
  "services",
  "email"
));

const { BASE_URL } = process.env;

const signUp = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    next(HttpError(409, "Email in use"));
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = `https:${gravatar.url(email, { s: "250" })}`;
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
    text: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  return res.status(201).json({
    message: `Success sign up user: {"email": ${newUser.email}, "subscription": ${newUser.subscription}}`,
  });
};

module.exports = { signUp: ctrlWrapper(signUp) };
