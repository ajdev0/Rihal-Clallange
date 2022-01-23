require("express-async-errors");
const winston = require("winston");
// require("winston-mongodb");
module.exports = function () {
  //Uncaught exception
  // process.on("uncaughtException", (ex) => {
  //   winston.error(ex.message, ex);
  //   process.exit(1);
  // });

  winston.exceptions.handle(
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "uncaughtexception.log" })
  );
  //unhandledRejection
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
  //winston
  winston.add(new winston.transports.Console({ level: "info" }));
  winston.add(new winston.transports.File({ filename: "logFile.log" }));
  // winston.add(
  //   new winston.transports.MongoDB({
  //     db: "mongodb://localhost/rihal-challenge",
  //     options: { useUnifiedTopology: true },
  //   })
  // );
};
