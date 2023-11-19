const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const deleteKeys = require("../utils/delete-keys");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(createError("unauthenticated", 401));
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET || "6546sajkhsajkdh");

    const user = await prisma.users.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (!user) {
      return next(createError("unauthenticated", 401));
    }

    let keysToDelete = ["password"];
    deleteKeys(user, keysToDelete);
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError") {
      err.statusCode = 401;
    }
    next(err);
  }
};
