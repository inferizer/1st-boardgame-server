const { rateLimit } = require("express-rate-limit");

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  message: { message: "Too many request from this IP" },
});