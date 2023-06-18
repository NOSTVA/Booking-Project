require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const bodyParser = require("body-parser");

const appointmentsRouter = require("../routes/appointmentsRouter");
const applicantsRouter = require("../routes/applicantsRouter");
const authRouter = require("../routes/authRouter");
const clientRouter = require("../routes/clientRouter");

const app = express();
const SessionStore = MongoStore.create({ mongoUrl: process.env.MONGO_URI });

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(flash());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: SessionStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },
  })
);

require("./passport-config");
app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);
app.use(clientRouter);
app.use("/api/v1/appointments", appointmentsRouter);
app.use("/api/v1/applicants", applicantsRouter);
app.use(express.static(path.join(__dirname, "../public")));

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({
    error: {
      status: "Internal server error",
      msg: err.message,
    },
  });
});

module.exports = app;
