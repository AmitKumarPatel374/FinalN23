const JWT = require("jsonwebtoken");
const userModel = require("../models/user.model");

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



module.exports= {
    registerController,
    loginController
}