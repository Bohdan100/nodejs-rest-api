const path = require("path");
const { Contact } = require(path.join(__dirname, "..", "..", "models"));
const { ctrlWrapper, HttpError } = require(path.join(
  __dirname,
  "..",
  "..",
  "helpers"
));

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const { _id: owner } = req.user;

  if (!name && !email && !phone) {
    next(HttpError(400, "Missing required fields"));
  }

  const newContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    {
      $set: {
        name,
        email,
        phone,
      },
    }
  );
  if (!newContact) {
    next(HttpError(404, "Not Found"));
  }

  return res.status(200).json({
    message: "Success update contact",
  });
};

module.exports = { update: ctrlWrapper(updateContact) };
