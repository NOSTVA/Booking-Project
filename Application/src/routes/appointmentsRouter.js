const express = require("express");
const router = express.Router();

const {
  getAppointments,
  getAppointmentById,
  createAppointment,
  deleteAppointmentById,
  updateAppointmentById,
} = require("../controllers/controller");

const { requireAdmin } = require("../controllers/auth");

router.get("/", requireAdmin, getAppointments);
router.get("/:id", getAppointmentById);
router.post("/", createAppointment);
router.delete("/:id", deleteAppointmentById);
router.patch("/:id", updateAppointmentById);

module.exports = router;
