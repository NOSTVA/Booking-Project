function isAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(302).redirect("/login");
  }
  next();
}

function isNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.status(302).redirect("/");
  }
  next();
}

function requireAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { isAuthenticated, isNotAuthenticated, requireAdmin };