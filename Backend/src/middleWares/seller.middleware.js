const jwt = require("jsonwebtoken");
const sellerModel = require("../models/seller.model");
const sellerMiddleWare = async (req, res, next) => {
    try {
        let sellerToken = req.cookies.sellerToken;

        if (!sellerToken) {
            return res.status(404).json({
                message: "token not found"
            })
        }

        let isBlackListed = await cacheInstance.get(sellerToken);
        if (isBlackListed) {
            return res.status(400).json({
                message: "sellerToken is blackList!"
            })
        }

        const decode = jwt.verify(sellerToken, process.env.SELLER_JWT_SECRET);

        if (!decode) {
            return res.status(400).json({
                message: "Invalid sellerToken!"
            })
        }
        const seller = await sellerModel.findById(decode.id);
        req.seller = seller;
        next();
    } catch (error) {
        console.log("error in authMiddleWare->", error);
        return res.status(500).json({
            message: "Internal server error!"
        })
    }
}

module.exports = sellerMiddleWare;