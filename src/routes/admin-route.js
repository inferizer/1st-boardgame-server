const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const authenticateMiddleware = require("../middlewares/authenticate");

// add new admin
router.post("/add", authenticateMiddleware, adminController.addAdmin);

// store product page
router.post("/add-product", authenticateMiddleware, adminController.addProduct);
router.post(
  "/add-stock/:productId",
  authenticateMiddleware,
  adminController.addStock
);
router.post(
  "/remove-stock",
  authenticateMiddleware,
  adminController.removeStock
);
router.delete(
  "/delete/:productId",
  authenticateMiddleware,
  adminController.deleteProduct
);
router.get(
  "/update-product",
  authenticateMiddleware,
  adminController.getAllporducts
);

router.post(
  "/update-stock",
  authenticateMiddleware,
  adminController.updateStock
);

// customer order page
router.get("/order", authenticateMiddleware, adminController.getAllOrder);

module.exports = router;
