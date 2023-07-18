const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { SECRET_KEY } = process.env;

const path = require("path");
const { User } = require(path.join(__dirname, "..", "..", "models"));
const { ctrlWrapper, HttpError } = require(path.join(
  __dirname,
  "..",
  "..",
  "helpers"
));

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    next(HttpError(401, "Email or password invalid"));
  }
  if (!user.verify) {
    next(HttpError(401, "Email not verified"));
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    next(HttpError(401, "Email or password invalid"));
  }

  const payload = {
    id: user._id,
    subscription: user.subscription,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });

  return res.status(200).json({
    message: `token: ${token}, user: {email: ${user.email}, subscription: ${user.subscription}}`,
  });
};

module.exports = { login: ctrlWrapper(login) };
