const { getAll } = require("./getAllContacts");
const { getById } = require("./getContactById");
const { add } = require("./addContact");
const { update } = require("./updateContact");
const { updateStatus } = require("./updateStatusContact");
const { remove } = require("./removeContact");

module.exports = {
  getAll,
  getById,
  add,
  update,
  updateStatus,
  remove,
};
