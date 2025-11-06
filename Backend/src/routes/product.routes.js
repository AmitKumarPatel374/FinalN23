const express = require("express");
const sellerMiddleWare = require("../middleWares/seller.middleware");
const { createProductController, updateProductController, getAllProductController, deleteProductController, getProductController, getProductByCategoryController } = require("../controller/product.controller");
const upload = require("../config/multer");
const authMiddleWare = require("../middleWares/auth.middleware");

const router = express.Router();

router.post("/create-product",sellerMiddleWare,upload.array("images",5),createProductController);
router.post("/update-product/:product_id",sellerMiddleWare,upload.array("images",5),updateProductController);
router.get("/get-products",sellerMiddleWare,getAllProductController);
router.delete("/delete-product/:product_id",sellerMiddleWare,deleteProductController);
router.get("/get-products/:product_id",authMiddleWare,getProductController);
router.get("/:category",getProductByCategoryController);

module.exports =router;