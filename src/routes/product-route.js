const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");
const authenticateMiddleware = require("../middlewares/authenticate");

router.get("/get-product", productController.getAllporducts);
router.post("/get-cart", productController.getItemCart);
router.post("/cart", authenticateMiddleware, productController.addToCart);
router.delete(
  "/delete-item/:itemId",
  authenticateMiddleware,
  productController.deleteItem
);
router.patch(
  "/add-quantity/:itemId",
  authenticateMiddleware,
  productController.addQuantity
);
router.patch(
  "/remove-quantity/:itemId",
  authenticateMiddleware,
  productController.rmvQuantity
);

module.exports = router;
