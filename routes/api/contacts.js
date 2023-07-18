const express = require("express");
const router = express.Router();

const path = require("path");
const { isValidId } = require(path.join(__dirname, "..", "..", "middlewares"));
const { contCtrl } = require(path.join(__dirname, "..", "..", "controllers"));
const { contactSchema } = require(path.join(__dirname, "..", "..", "schemas"));
const { isAuth } = require(path.join(__dirname, "..", "..", "middlewares"));

router.get("/", isAuth, contCtrl.getAll);

router.get("/:contactId", isAuth, isValidId, contCtrl.getById);

router.post("/", isAuth, contactSchema.add, contCtrl.add);

router.put(
  "/:contactId",
  isAuth,
  isValidId,
  contactSchema.update,
  contCtrl.update
);

router.patch(
  "/:contactId/favorite",
  isAuth,
  isValidId,
  contactSchema.updateStatus,
  contCtrl.updateStatus
);

router.delete("/:contactId", isAuth, isValidId, contCtrl.remove);

module.exports = router;
