const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const structure = {
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "password minimum length 6"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "invalid email",
    ],
    unique: [true, "email already exists"],
    lowercase: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
};

const options = {
  timestamps: true,
};

const userSchema = new mongoose.Schema(structure, options);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (canditatePassword) {
  return (isMatch = await bcrypt.compare(canditatePassword, this.password));
};

module.exports = mongoose.model("User", userSchema);
