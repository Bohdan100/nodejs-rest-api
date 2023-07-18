const path = require("path");
const { Contact } = require(path.join(__dirname, "..", "..", "models"));
const { ctrlWrapper } = require(path.join(__dirname, "..", "..", "helpers"));

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;

  let { page = 1, limit = 10, favorite = null } = req.query;
  if (parseInt(limit) > 10 || parseInt(limit) <= 0) {
    limit = 10;
  }
  const skip = (page - 1) * limit;
  let contacts = [];

  if (favorite === null) {
    contacts = await Contact.find({ owner }, "-createdAt -updatedAt -owner", {
      skip,
      limit,
    });
  } else {
    contacts = await Contact.find(
      { owner, favorite },
      "-createdAt -updatedAt -owner",
      {
        skip,
        limit,
      }
    );
  }

  return res.status(200).json({
    contacts,
    message: "Success get contacts list",
  });
};

module.exports = { getAll: ctrlWrapper(listContacts) };
