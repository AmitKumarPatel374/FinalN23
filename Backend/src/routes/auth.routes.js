const express = require("express");
const { loginController, registerController, updateUserController, getProfileController, logoutController } = require("../controller/auth.controller");
const authMiddleWare = require("../middleWares/auth.middleware");

const router = express.Router();

router.post('/register',registerController);
router.post('/login',loginController);
router.delete('/logout',logoutController);
router.post('/update-user',authMiddleWare,updateUserController);
router.get('/get-user',authMiddleWare,getProfileController);

module.exports=router;