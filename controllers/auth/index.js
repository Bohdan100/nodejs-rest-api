const { signUp } = require("./signUp");
const { login } = require("./login");
const { getCurrent } = require("./getCurrent");
const { sub } = require("./sub");
const { logout } = require("./logout");
const { upload } = require("./upload");
const { verifyEmail } = require("./verifyEmail");
const { resendVerify } = require("./resendVerify");

module.exports = {
  signUp,
  login,
  getCurrent,
  sub,
  logout,
  upload,
  verifyEmail,
  resendVerify,
};
