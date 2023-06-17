const express = require("express");
const router = express.Router();

const {
  getAppointments,
  getAppointmentById,
  createAppointment,
  deleteAppointmentById,
  updateAppointmentById,
} = require("../controllers/controller");

const { isAuthenticated, requireAdmin } = require("../controllers/auth");

router.get("/", getAppointments);
router.get("/:id", getAppointmentById);
router.post("/", createAppointment);
router.delete("/:id", deleteAppointmentById);
router.patch("/:id", updateAppointmentById);

module.exports = router;
