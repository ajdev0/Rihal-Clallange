const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  if (!config.get("requiresAuth")) return next();
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("access denied. no token provides.");
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Inavlid token");
  }
}

module.exports = auth;