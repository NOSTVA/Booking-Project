const express = require("express");
const router = express.Router();

const {
  getAppointments,
  getAppointmentById,
  createAppointment,
  deleteAppointmentById,
  updateAppointmentById,
} = require("../controllers/controller");

router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.post("/", createAppointment);
router.delete("/:id", deleteAppointmentById);
router.put("/:id", updateAppointmentById);

module.exports = router;
