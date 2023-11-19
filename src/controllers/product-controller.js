const prisma = require("../models/prisma");
const deleteKeys = require("../utils/delete-keys");
// const createError = require("../utils/create-error");

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

exports.getItemCart = async (req, res, next) => {
  const { id } = req.body;
  try {
    const result = await prisma.cart.findMany({
      where: { userId: { id: id } },
      include: { productId: true },
    });
    res.status(200).json({ result });
  } catch (error) {
    return next(error);
  }
};

exports.addToCart = async (req, res, next) => {
  const { userId, productId } = req.body;
  try {
    const result = await prisma.cart.findFirst({
      where: { usersId: +userId, productsId: +productId },
    });

    if (result) {
      const { id, quantity } = result;
      await prisma.cart.update({
        where: { id },
        data: { quantity: quantity + 1 },
      });
    } else {
      await prisma.cart.create({
        data: { usersId: +userId, productsId: +productId, quantity: 1 },
      });
    }
    res.status(200).json({ message: "add to cart" });
  } catch (error) {
    return next(error);
  }
};

exports.deleteItem = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    await prisma.cart.delete({ where: { id: +itemId } });
    res.status(200).json({ msg: "delete item" });
  } catch (error) {
    return next(error);
  }
};

exports.addQuantity = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const result = await prisma.cart.findFirst({ where: { id: +itemId } });
    const { id, quantity } = result;
    await prisma.cart.update({
      where: { id },
      data: { quantity: quantity + 1 },
    });
    res.status(200).json({ msg: "add quantity" });
  } catch (error) {
    return next(error);
  }
};

exports.rmvQuantity = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    const result = await prisma.cart.findFirst({ where: { id: +itemId } });
    const { id, quantity } = result;
    if (quantity === 1) {
      await prisma.cart.delete({ where: { id } });
    } else {
      await prisma.cart.update({
        where: { id },
        data: { quantity: quantity - 1 },
      });
    }
    res.status(200).json({ msg: "remove quantity" });
  } catch (error) {
    return next(error);
  }
};
