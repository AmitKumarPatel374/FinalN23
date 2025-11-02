const JWT = require("jsonwebtoken");
const cacheInstance = require("../services/cache.service");
const sendFiles = require("../services/storage.service");
const sellerModel = require("../models/seller.model");

const sellerRegisterController = async (req, res) => {
    try {
        let { sellerName, sellerUserName, sellerEmail, sellerMobile, sellerPassword ,sellerAadhar} = req.body;

        if (!sellerName || !sellerUserName || !sellerEmail || !sellerMobile || !sellerPassword ||!sellerAadhar) {
            return res.status(422).json({
                message: "all feilds are required!"
            });
        }

        const existingSeller = await sellerModel.findOne({ sellerEmail });

        if (existingSeller) {
            return res.status(400).json({
                message: "seller already exist!",
                user: existingSeller
            })
        }

        const newSeller = await sellerModel.create({
            sellerName,
            sellerUserName,
            sellerEmail,
            sellerMobile,
            sellerPassword,
            sellerAadhar
        })
        // let token = newSeller.generateToken();
        // res.cookie("sellerToken",token);

        return res.status(201).json({
            message: "seller reigistered successfully!",
            seller: newSeller
        })
    } catch (error) {
        console.log("error in registration!",error);
        return res.status(500).json({
            message:"internal server error!",
            error:error
        })
    }

}

const sellerLoginController = async (req, res) => {
    try {
        let {sellerEmail, sellerPassword } = req.body;

        if (!sellerEmail || !sellerPassword) {
            return res.status(422).json({
                message: "all crediantials are required!"
            });
        }

        const seller = await sellerModel.findOne({ sellerEmail });

        if (!seller) {
            return res.status(404).json({
                message: "seller not found!",
            })
        }

        let comparePassword = seller.comparePass(sellerPassword);

        if (!comparePassword) {
            return res.status(400).json({
                message:"Invalid creditials!"
            })
        }

        let sellerToken = seller.generateToken();
        res.cookie("sellerToken",sellerToken);

        return res.status(201).json({
            message: "seller logged in successfully!",
            seller: seller
        })
    } catch (error) {
        console.log("error in log in!",error);
        return res.status(500).json({
            message:"internal server error!",
            error:error
        })
    }

}

const sellerLogoutController=async(req,res)=>{
     try {
        let sellerToken = req.cookies.sellerToken;
        if (!sellerToken) {
            return res.status(404).json({
                message:"sellerToken not found"
            })
        }

        await cacheInstance.set(sellerToken,"BlackListed");

        res.clearCookie("sellerToken");

        return res.status(200).json({
            message:"seller logged out successfully!"
        })
     } catch (error) {
        console.log("error in log in!",error);
        return res.status(500).json({
            message:"internal server error!",
            error:error
        })
     }
}

const sellerUpdateUserController = async (req,res) => {
    try {
        let {  sellerName, sellerUserName, sellerEmail, sellerMobile, sellerAadhar} = req.body;

        if (!sellerName || !sellerEmail || !sellerUserName  || !sellerMobile || !sellerAadhar) {
            return res.status(404).json({
                message: "All fields are required",
            });
        }

        let uploadedImage;
        if (req.file) {
            uploadedImage= await sendFiles(
                req.file.buffer,
                req.file.originalname
            )
        }

        let updatedSeller = await sellerModel.findOneAndUpdate(
            { sellerEmail },
            {
                sellerName,
                sellerEmail,
                sellerUserName,
                sellerMobile,
                sellerAadhar,
                sellerProfileLogo:uploadedImage.url || "", 
            }
        );

        
        return res.status(201).json({
            message: "seller updated successfully",
            seller: updatedSeller,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error ",
            error: error,
        });
    }
}

const getSellerProfileController = async (req, res) => {
    try {
        let seller = req.seller; ///authmiddleware sets this
        return res.status(200).json({
            message: "profile fetched successfully!",
            seller: seller
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error!",
            error: error
        })
    }
}

module.exports= {
    sellerRegisterController,
    sellerLoginController,
    sellerLogoutController,
    sellerUpdateUserController,
    getSellerProfileController
}