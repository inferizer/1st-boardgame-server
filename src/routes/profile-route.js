const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile-controller");
const authenticateMiddleware = require("../middlewares/authenticate");

router.post("/edit", authenticateMiddleware, profileController.editProfile);

router.post(
  "/wishlist",
  authenticateMiddleware,
  profileController.addToWishlist
);

router.delete(
  "/remove-wishlist/:removeId",
  authenticateMiddleware,
  profileController.removeWishList
);
router.post(
  "/get-wishlist",
  authenticateMiddleware,
  profileController.getAllWishList
);

module.exports = router;
