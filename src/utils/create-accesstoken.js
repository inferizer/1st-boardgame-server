const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const EXP = process.env.JWT_EXP;

function createAccessToken(payload) {
  return jwt.sign(payload, SECRET || "6546sajkhsajkdh", {
    expiresIn: EXP,
  });
}

module.exports = createAccessToken;
