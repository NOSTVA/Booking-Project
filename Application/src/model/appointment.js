const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    expectedTravelDate: {
      type: Date,
      required: true,
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
    phone: {
      type: String,
      required: true,
      trim: true,
      match: /^\+20\s\d{11}$/,
    },
    note: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      default: "todo",
      enum: ["todo", "completed", "cancelled"],
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
