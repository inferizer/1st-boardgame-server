const { registerSchema } = require("../validators/auth-validator");
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
    res.status(200).json({ message: "register success" });
  } catch (error) {
    return next(error);
  }
};
