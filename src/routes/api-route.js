const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api-controller");

router.get("/search", apiController.getDataBGG);
router.get("/thing", apiController.getDatabyId);

module.exports = router;
