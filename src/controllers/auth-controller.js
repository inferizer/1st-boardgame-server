const { registerSchema } = require("../validators/auth-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const prisma = require("../models/prisma");

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
    console.log(user);
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
