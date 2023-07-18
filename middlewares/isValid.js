const { isValidObjectId } = require("mongoose");
const path = require("path");

const { HttpError } = require(path.join(__dirname, "..", "helpers"));

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
