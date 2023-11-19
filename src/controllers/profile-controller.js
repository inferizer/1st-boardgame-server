const prisma = require("../models/prisma");
const deleteKeys = require("../utils/delete-keys");

exports.editProfile = async (req, res, next) => {
  try {
    const value = req.body;
    console.log(req.body);
    updateProfile = await prisma.users.update({
      where: { id: value.id },
      data: value,
    });
    res.status(200).json({ message: "edit ok", updateProfile });
  } catch (error) {
    return next(error);
  }
};

exports.addToWishlist = async (req, res, next) => {
  try {
    const { userId, productId } = req.body;

    await prisma.userCollections.create({
      data: {
        userId: { connect: { id: +userId } },
        productId: { connect: { id: productId } },
      },
    });
    res.status(200).json({ message: "add to wishlist" });
  } catch (error) {
    return next(error);
  }
};

exports.removeWishList = async (req, res, next) => {
  try {
    const { removeId } = req.params;

    await prisma.userCollections.delete({ where: { id: +removeId } });

    res.status(200).json({ message: "remove wishlist" });
  } catch (error) {
    return next(error);
  }
};

exports.getAllWishList = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const result = await prisma.users.findUnique({
      where: {
        id: userId,
      },
      include: {
        user_collections: {
          select: { id: true, productId: true },
        },
      },
    });
    const keysToDelete = [
      "id",
      "email",
      "password",
      "firstName",
      "lastName",
      "mobile",
      "role",
    ];
    deleteKeys(result, keysToDelete);
    res.status(200).json({ message: "get wishlist", result });
  } catch (error) {
    return next(error);
  }
};
