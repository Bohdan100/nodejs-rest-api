const { Schema, model } = require("mongoose");

const path = require("path");
const { MongooseError } = require(path.join(__dirname, "..", "helpers"));

const dateRegexp = /^\d{2}-\d{2}-\d{4}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    date: {
      type: String,
      match: dateRegexp,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", MongooseError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
