// Require necessary modules
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../model/user");

// Authenticate user with email (which is actually the username) and password
const authenticateUser = async (email, password, done) => {
  const user = await User.findOne({ email: email });

  if (user == null) {
    return done(null, false, { message: "invalid email" });
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: "invalid password" });
    }
  } catch (error) {
    done(error);
  }
};

// Create new LocalStrategy with email and password fields and the authenticateUser function
const strategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  authenticateUser
);

// Use the LocalStrategy with Passport
passport.use(strategy);

// Serialize user by user id
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user by user id and return user object
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select("email role createdAt");
    done(null, user);
  } catch (err) {
    done(err);
  }
});
