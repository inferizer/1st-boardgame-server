const { registerSchema, loginSchema } = require("../validators/auth-validator");
const bcrypt = require("bcryptjs");
const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const deleteKeys = require("../utils/delete-keys");
const createAccessToken = require("../utils/create-accesstoken");

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
    const accessToken = createAccessToken(payload);

    let keysToDelete = ["password", "role"];
    deleteKeys(user, keysToDelete);

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

    const accessToken = createAccessToken(payload);

    const keysToDelete = ["password", "firstName", "lastName", "mobile"];

    deleteKeys(user, keysToDelete);

    res.status(201).json({ accessToken, user });
  } catch (error) {
    return next(error);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
