const express = require("express");
const router = express.Router();

const {
  addApplicant,
  deleteApplicantById,
  updateApplicantById,
} = require("../controllers/controller");

const { isAuthenticated } = require("../controllers/auth");

router.post("/", addApplicant);
router.delete("/:id", deleteApplicantById);
router.patch("/:id", updateApplicantById);

module.exports = router;
