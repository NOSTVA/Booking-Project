const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema(
  {
    appointment: {
      type: mongoose.Types.ObjectId,
      ref: "Appointment",
      required: [true, "Appointment is required"],
      index: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name cannot be more than 50 characters"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name cannot be more than 50 characters"],
      trim: true,
    },
    passportNumber: {
      type: String,
      required: [true, "Passport number is required"],
      index: true,
      trim: true,
      unique: [true, "Passport number is not unique"],
      validate: {
        validator: function (v) {
          return /\d{9}/.test(v);
        },
        message: (props) => `${props.value} is not a valid passport number!`,
      },
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
      validate: {
        validator: function (v) {
          return v < new Date();
        },
        message: (props) => `${props.value} is not a valid date of birth!`,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = Applicant;
