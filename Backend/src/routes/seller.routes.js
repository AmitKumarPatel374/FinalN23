const express = require("express");
const sellerMiddleWare = require("../middleWares/seller.middleware");
const { sellerRegisterController, sellerLoginController, sellerLogoutController, sellerUpdateUserController, getSellerProfileController } = require("../controller/seller.controller");

const router = express.Router();

router.post('/seller-register',sellerRegisterController);
router.post('/seller-login',sellerLoginController);
router.delete('/seller-logout',sellerLogoutController);
router.post('/seller-update-user',sellerMiddleWare,sellerUpdateUserController);
router.get('/get-seller',sellerMiddleWare,getSellerProfileController);

module.exports=router;