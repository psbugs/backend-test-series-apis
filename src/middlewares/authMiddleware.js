const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  console.log('req.headers.',req.headers)
  const authHeader = req.headers.authorization;
  console.log('authHeader',authHeader)
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.log('error',error.message)
    return res.status(403).json({ message: "Unauthorized access" });
  }
};

module.exports = authMiddleware;