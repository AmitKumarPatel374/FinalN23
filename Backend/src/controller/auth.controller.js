const JWT = require("jsonwebtoken");
const userModel = require("../models/user.model");
const cacheInstance = require("../services/cache.service");
const sendFiles = require("../services/storage.service");

const registerController = async (req, res) => {
    try {
        let { name, username, email, mobile, password } = req.body;

        if (!name || !username || !email || !mobile || !password) {
            return res.status(422).json({
                message: "all feilds are required!"
            });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "user already exist!",
                user: existingUser
            })
        }

        const newUser = await userModel.create({
            name,
            username,
            email,
            mobile,
            password
        })
        let token = newUser.generateToken();
        res.cookie("token",token);

        return res.status(201).json({
            message: "user reigistered successfully!",
            user: newUser
        })
    } catch (error) {
        console.log("error in registration!",error);
        return res.status(500).json({
            message:"internal server error!",
            error:error
        })
    }

}

const loginController = async (req, res) => {
    try {
        let {email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({
                message: "all crediantials are required!"
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "user not found!",
            })
        }

        let comparePassword = user.comparePass(password);

        if (!comparePassword) {
            return res.status(400).json({
                message:"Invalid creditials!"
            })
        }

        let token = user.generateToken();
        res.cookie("token",token);

        return res.status(201).json({
            message: "user logged in successfully!",
            user: user
        })
    } catch (error) {
        console.log("error in log in!",error);
        return res.status(500).json({
            message:"internal server error!",
            error:error
        })
    }

}

const logoutController=async(req,res)=>{
     try {
        let token = req.cookies.token;
        if (!token) {
            return res.status(404).json({
                message:"token not found"
            })
        }

        await cacheInstance.set(token,"BlackListed");

        res.clearCookie("token");

        return res.status(200).json({
            message:"user logged out successfully!"
        })
     } catch (error) {
        console.log("error in log in!",error);
        return res.status(500).json({
            message:"internal server error!",
            error:error
        })
     }
}

const updateUserController = async (req,res) => {
    try {
        let {  name, username, email, mobile } = req.body;

        if (!name || !email || !username  || !mobile ) {
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

        let updatedUser = await UserModel.findOneAndUpdate(
            { email },
            {
                name,
                email,
                username,
                mobile,
                profileLogo:uploadedImage.url || "", 
            }
        );

        
        return res.status(201).json({
            message: "user updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error ",
            error: error,
        });
    }
}

const getProfileController = async (req, res) => {
    try {
        let user = req.user; ///authmiddleware sets this
        return res.status(200).json({
            message: "profile fetched successfully!",
            user: user
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error!",
            error: error
        })
    }
}

module.exports= {
    registerController,
    loginController,
    logoutController,
    updateUserController,
    getProfileController
}