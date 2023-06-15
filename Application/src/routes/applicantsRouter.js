const express = require("express");
const router = express.Router();

const {
  addApplicant,
  deleteApplicantById,
  updateApplicantById,
} = require("../controllers/controller");

router.post("/", addApplicant);
router.delete("/:id", deleteApplicantById);
router.put("/:id", updateApplicantById);

module.exports = router;
