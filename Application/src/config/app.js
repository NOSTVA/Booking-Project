const express = require("express");
const cors = require("cors");

const appointmentsRouter = require("../routes/appointmentsRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", appointmentsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: {
      status: "Internal server error",
      message: err.message,
    },
  });
});

module.exports = app;
