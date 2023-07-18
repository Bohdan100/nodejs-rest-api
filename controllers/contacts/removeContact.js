const path = require("path");
const { Contact } = require(path.join(__dirname, "..", "..", "models"));
const { ctrlWrapper, HttpError } = require(path.join(
  __dirname,
  "..",
  "..",
  "helpers"
));

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndRemove({ _id: contactId, owner });
  if (!result) {
    next(HttpError(404, "Not Found"));
  }

  return res.status(200).json({
    message: `Contact with ${contactId} deleted`,
  });
};

module.exports = {
  remove: ctrlWrapper(removeContact),
};
