const express = require("express");
const router = express.Router();

const {
  getAppointments,
  createAppointment,
} = require("../controllers/appointments");

router.get("/appointment/static", getAppointments);
router.post("/appointment", createAppointment);

module.exports = router;
