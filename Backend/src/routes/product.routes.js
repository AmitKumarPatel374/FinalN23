const express = require("express");
const sellerMiddleWare = require("../middleWares/seller.middleware");
const { createProductController, updateProductController, getAllProductController, deleteProductController } = require("../controller/product.controller");
const upload = require("../config/multer");

const router = express.Router();

router.post("/create-product",sellerMiddleWare,upload.array("images",5),createProductController);
router.post("/update-product",sellerMiddleWare,upload.array("images",5),updateProductController);
router.post("/get-products",sellerMiddleWare,getAllProductController);
router.post("/update-product",sellerMiddleWare,deleteProductController);

module.exports =router;