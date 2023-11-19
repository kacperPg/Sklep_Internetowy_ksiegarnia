const mongoose = require("mongoose");
const validator = require('validator');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true ,maxLength: 40},
    email: { type: String, required: true,match: /.+\@.+\..+/, unique: true },
    password: { type: String, required: true,  minlength: 7},
    imie: { type: String, required: true },
    nazwisko: { type: String, required: true },
    telefon: { type: Number, required: true ,min: 9999999 },
    address: { type: String, required: true },
    kodpocztowy: { type: Number, required: true },
    wiek: { type: Number, min: 18, max: 101 },
        isAdmin: {
      type: Boolean,
      default: false
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);