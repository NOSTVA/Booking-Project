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
      required: [true, "first name is required"],
      minlength: [2, "first name must be at least 2 characters"],
      maxlength: [50, "first name cannot be more than 50 characters"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
      minlength: [2, "last name must be at least 2 characters"],
      maxlength: [50, "last name cannot be more than 50 characters"],
      trim: true,
    },
    passportNumber: {
      type: String,
      required: [true, "passport number is required"],
      index: true,
      trim: true,
      unique: [true, "passport number already exists"],
    },
    dateOfBirth: {
      type: Date,
      required: [true, "date of birth is required"],
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
