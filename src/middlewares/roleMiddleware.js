// middleware/roleMiddleware.js
const permitRoles = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req?.user?.role || 'admin')) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};

module.exports = permitRoles;