const express = require("express");
const path = require("path");
const cors = require("cors");

const appointmentsRouter = require("../routes/appointmentsRouter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use("/api/v1", appointmentsRouter);
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({
    error: {
      status: "Internal server error",
      message: err.message,
    },
  });
});

module.exports = app;
