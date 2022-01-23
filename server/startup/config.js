const config = require("config");
module.exports = function () {
  // jwt
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR! jwtPrivateKey not defined");
  }
};
