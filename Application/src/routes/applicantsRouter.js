const express = require("express");
const router = express.Router();

const {
  addApplicant,
  deleteApplicantById,
  updateApplicantById,
} = require("../controllers/controller");

const { isAuthenticated } = require("../controllers/auth");

router.post("/", isAuthenticated, addApplicant);
router.delete("/:id", isAuthenticated, deleteApplicantById);
router.patch("/:id", isAuthenticated, updateApplicantById);

module.exports = router;
