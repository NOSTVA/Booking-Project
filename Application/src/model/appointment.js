const mongoose = require("mongoose");
const Attributes = require("./attributes");

const appointmentSchema = new mongoose.Schema(
  {
    expectedTravelDate: {
      type: Date,
      required: [true, " expected travel date is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
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
    phone: {
      type: String,
      required: [true, "phone is required"],
      trim: true,
      match: /^\+20\d{11}$/,
    },
    note: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      default: "pending",
      enum: Attributes.statusEnums,
      index: true,
    },
    owner: {
      type: String,
      default: "none",
      enum: Attributes.ownerEnums,
      index: true,
    },
    visa: {
      type: String,
      default: "none",
      enum: Attributes.visaEnums,
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
