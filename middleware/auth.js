const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = function (req, res, next) {
  const token = req.header("x-auth-header");
  if (!token)
    return res.status(401).send("You do not have access to this resource");
  try {
    const decoded = jwt.sign(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(400).send("Invalid token.");
  }
};
