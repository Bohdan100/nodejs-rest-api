const path = require("path");
const { Contact } = require(path.join(__dirname, "..", "..", "models"));
const { ctrlWrapper, HttpError } = require(path.join(
  __dirname,
  "..",
  "..",
  "helpers"
));

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { _id: owner } = req.user;

  if (!name || !email || !phone) {
    next(HttpError(400, "Missing required fields"));
  }

  const newContact = await Contact.create({ ...req.body, owner });
  if (!newContact) {
    next(HttpError(404, "Not created"));
  }

  return res.status(201).json({
    message: `Success add contact to your phonebook: ${newContact}`,
  });
};

module.exports = { add: ctrlWrapper(addContact) };
