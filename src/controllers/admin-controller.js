const bcrypt = require("bcryptjs");
const prisma = require("../models/prisma");
const { registerSchema } = require("../validators/auth-validator");
const deleteKeys = require("../utils/delete-keys");
const createAccessToken = require("../utils/create-accesstoken");

// post add admin
exports.addAdmin = async (req, res, next) => {
  try {
    const { value, error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    value.password = await bcrypt.hash(value.password, 12);
    const user = await prisma.users.create({
      data: { ...value, role: "ADMIN" },
    });

    const payload = {
      email: user.email,
    };
    const accessToken = createAccessToken(payload);

    let keysToDelete = ["password"];
    deleteKeys(user, keysToDelete);

    res.status(201).json({ accessToken, user });
  } catch (error) {
    return next(error);
  }
};

// get all product
exports.getAllporducts = async (req, res, next) => {
  try {
    const result = await prisma.products.findMany({
      where: { isDelete: false },
    });
    res.status(200).json({ message: "update product", result });
  } catch (error) {
    return next(error);
  }
};

// post add product
exports.addProduct = async (req, res, next) => {
  try {
    const value = req.body;

    const result = await prisma.products.create({ data: value });
    res.status(200).json({ message: "add product" });
  } catch (error) {
    return next(error);
  }
};

exports.addStock = async (req, res, next) => {
  try {
    const value = req.params.productId;

    console.log(value, req.body);
    // await prisma.products.update({ where: value, data: { stock } });
    res.status(200).json({ message: "add" });
  } catch (error) {
    next(error);
  }
};

exports.removeStock = async (req, res, next) => {
  try {
    const value = req.params.productId;
  } catch (error) {
    next(error);
  }
};

// delete delete product
exports.deleteProduct = async (req, res, next) => {
  const value = req.params.productId;
  try {
    await prisma.products.update({
      where: { id: +value },
      data: { isDelete: true },
    });
    res.status(200).json({ message: "delete product" });
  } catch (error) {
    return next(error);
  }
};

// get all order
exports.getAllOrder = async (req, res, next) => {
  try {
    const result = await prisma.orders.findMany();
    res.status(200).json({ message: "update order", result });
  } catch (error) {
    return next(error);
  }
};

exports.updateStock = async (req, res, next) => {
  const { stock, price } = req.body.updateStock;
  const { id } = req.body;

  await prisma.products.update({
    where: { id: +id },
    data: { stock: +stock, price: +price },
  });
  try {
    res.status(200).json({ message: "update stock" });
  } catch (error) {
    return next(error);
  }
};
