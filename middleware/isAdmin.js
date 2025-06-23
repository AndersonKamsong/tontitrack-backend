

const isAdmin = (req, res, next) => {
  if (req.accountType !== "Admin") return res.status(403).json({ error: "Admin only." });
  next();
};

module.exports = isAdmin;
