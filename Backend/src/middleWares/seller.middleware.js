const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const sellerMiddleWare = async (req, res, next) => {
    try {
        let token = req.cookies.token;

        if (!token) {
            return res.status(404).json({
                message: "token not found"
            })
        }

        let isBlackListed = await cacheInstance.get(token);
        if (isBlackListed) {
            return res.status(400).json({
                message: "token is blackList!"
            })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) {
            return res.status(400).json({
                message: "Invalid token!"
            })
        }
        const user = await userModel.findById(decode.id);
        req.user = user;
        next();
    } catch (error) {
        console.log("error in authMiddleWare->", error);
        return res.status(500).json({
            message: "Internal server error!"
        })
    }
}

module.exports = sellerMiddleWare;