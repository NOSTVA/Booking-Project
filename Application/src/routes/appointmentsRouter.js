const express = require("express");
const router = express.Router();

const {
  getAppointments,
  getAppointmentById,
  createAppointment,
  deleteAppointmentById,
  addApplicant,
  deleteApplicantById,
  updateApplicantById,
} = require("../controllers/controller");

router.get("/appointments", getAppointments);
router.get("/appointments/:id", getAppointmentById);
router.post("/appointments", createAppointment);
router.delete("/appointments/:id", deleteAppointmentById);

router.post("/appointments/applicants", addApplicant);
router.delete("/appointments/applicants/:id", deleteApplicantById);
router.put("/appointments/applicants/:id", updateApplicantById);

module.exports = router;
