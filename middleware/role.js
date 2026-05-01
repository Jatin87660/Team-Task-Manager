function isAdmin(req, res, next) {
  if (!req.session.user || req.session.user.role !== "Admin") {
    return res.send("Access Denied. Admin only.");
  }

  next();
}

module.exports = isAdmin;