const path = require("path");
const { Contact } = require(path.join(__dirname, "..", "..", "models"));
const { ctrlWrapper, HttpError } = require(path.join(
  __dirname,
  "..",
  "..",
  "helpers"
));

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id: owner } = req.user;

  const contact = await Contact.findOne(
    { _id: contactId, owner },
    "-createdAt -updatedAt -owner"
  );

  if (!contact) {
    next(HttpError(404, `Contact '${contactId}' not found`));
  }

  return res.status(200).json({
    contact,
    message: "Success find contact",
  });
};

module.exports = { getById: ctrlWrapper(getContactById) };
