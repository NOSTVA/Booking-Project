const express = require("express");
const router = express.Router();
const path = require("path");

const {
  requireAdmin,
  isNotAuthenticated,
  isAuthenticated,
} = require("../controllers/auth");

router.get("/register", isNotAuthenticated, function (req, res) {
  res.sendFile(path.join(__dirname, "../public/register.html"));
});

router.get("/login", isNotAuthenticated, function (req, res) {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.get("/", isAuthenticated, (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
router.get("/dashboard", isAuthenticated, requireAdmin, (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
