const { registerSchema, loginSchema } = require("../validators/auth-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    value.password = await bcrypt.hash(value.password, 12);
    const user = await prisma.users.create({
      data: value,
    });

    const payload = {
      email: user.email,
    };
    const SECRET = process.env.JWT_SECRET;
    const EXP = process.env.JWT_EXP;
    const accessToken = jwt.sign(payload, SECRET || "6546sajkhsajkdh", {
      expiresIn: EXP,
    });

    delete user.password;
    res.status(201).json({ accessToken, user });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { value, error } = loginSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const user = await prisma.users.findFirst({
      where: {
        email: value.email,
      },
    });

    if (!user) {
      return next(createError("invalid credential", 400));
    }
    const isMatch = await bcrypt.compare(value.password, user.password);
    if (!isMatch) {
      return next(createError("invalid credential", 400));
    }

    const payload = {
      email: user.email,
    };
    const SECRET = process.env.JWT_SECRET;
    const EXP = process.env.JWT_EXP;
    const accessToken = jwt.sign(payload, SECRET || "6546sajkhsajkdh", {
      expiresIn: EXP,
    });

    delete user.password;
    res.status(201).json({ accessToken, user });
  } catch (error) {
    return next(error);
  }
};
