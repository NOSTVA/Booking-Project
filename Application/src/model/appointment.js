const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointments", schema);

module.exports = Appointment;
