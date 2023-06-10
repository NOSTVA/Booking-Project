const express = require("express");
const router = express.Router();

const {
  getAppointments,
  createAppointment,
  getApplicants,
  addApplicant,
  deleteApplicant,
  getApplicant,
  updateApplicant,
} = require("../controllers/controller");

router.get("/appointments", getAppointments);
router.post("/appointments", createAppointment);

router.get("/appointments/applicants", getApplicants);
router.get("/appointments/applicants/:applicantId", getApplicant);
router.post("/appointments/applicants", addApplicant);
router.delete("/appointments/applicants/:applicantId", deleteApplicant);
router.put("/appointments/applicants/:applicantId", updateApplicant);

module.exports = router;
