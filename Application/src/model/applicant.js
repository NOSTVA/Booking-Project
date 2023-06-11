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
    issueDate: {
      type: Date,
      required: [true, "Issue date is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          );
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    mobileNumber: {
      type: String,
      required: true,
      trim: true,
      match: /^\+20\s\d{11}$/,
    },
    note: {
      type: String,
      trim: true,
    },
    booked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Applicant = mongoose.model("Applicant", applicantSchema);

module.exports = Applicant;
