const express = require("express");
const router = express.Router();

const path = require("path");
const { userSchema } = require(path.join(__dirname, "..", "..", "schemas"));
const { isAuth, isUpload } = require(path.join(
  __dirname,
  "..",
  "..",
  "middlewares"
));
const { authCtrl } = require(path.join(__dirname, "..", "..", "controllers"));
const avatarsDir = path.join(__dirname, "..", "..", "public", "avatars");

router.post("/signup", userSchema.signUp, authCtrl.signUp);

router.get("/verify/:verificationToken", authCtrl.verifyEmail);
router.post("/verify", userSchema.email, authCtrl.resendVerify);

router.post("/login", userSchema.login, authCtrl.login);

router.get("/current", isAuth, authCtrl.getCurrent);

router.patch("/", isAuth, userSchema.sub, authCtrl.sub);

router.get("/logout", isAuth, authCtrl.logout);

router.patch("/avatars", isAuth, isUpload, authCtrl.upload);

router.use("/avatars/download", isAuth, express.static(avatarsDir));

module.exports = router;
