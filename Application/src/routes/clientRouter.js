const express = require("express");
const router = express.Router();
const path = require("path");

const { requireAdmin } = require("../controllers/auth");

router.get("/dashboard", requireAdmin, (req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
