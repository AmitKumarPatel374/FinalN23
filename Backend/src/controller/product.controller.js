const express = require("express");
const productModel = require("../models/product.model");
const sendFiles = require("../services/storage.service");

const createProductController = async (req, res) => {
    try {
        const { productName, currency, amount, description, sizes, colors,category } = req.body;

        if (!req.files) {
            return res.status(404).json({
                message: "Images are required"
            })
        }

        const uploadedImages = await Promise.all(
            req.files.map(async (file) => {
                await sendFiles(validate.buffer, validate.originalname);
            })
        )

        let newProduct = await productModel.create({
            productName,
            price: {
                currency,
                amount
            },
            description,
            category,
            images: uploadedImages.map((elem) => elem.url),
            sizes,
            colors,
            createdBy: req.user._id
        })

        if (!newProduct) {
            return res.status(400).json({
                message: "something went wrong"
            })
        }

        return res.status(201).json({
            message: "product created successfully!",
            product: newProduct
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error!"
        })
    }
}

const getAllProductController = async (req, res) => {
    try {

        const allProducts = await productModel.find({});

        if (!allProducts) {
            return res.status(404).json({
                message: "products not found"
            })
        }

        return res.status(201).json({
            message: "products fetched successfully!",
            products: allProducts
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error!"
        })
    }
}


const updateProductController = async (req, res) => {
    try {
        const { productName, currency, amount, description, sizes, colors,category } = req.body;
        let product_id= req.params.product_id;

        if (!product_id) {
            return res.status(404).json({
                message:"product id not found!"
            })
        }

        let existinImages = JSON.parse(req.body.existinImages || []);
        const finalImages = [...existinImages];
        if (req.files && req.files.length > 0) {
            const uploadedImages = await Promise.all(
                req.files.map(async (file) => {
                    await sendFiles(validate.buffer, validate.originalname);
                })
            )
            finalImages=[...finalImages,...uploadedImages.map((elem)=>elem.url)];
        }


        let updatedProduct = await productModel.findByIdAndUpdate({
            _id:product_id
        },{
            productName,
            price: {
                currency,
                amount
            },
            description,
            category,
            images: finalImages,
            sizes,
            colors,
        })

        if (!updatedProduct) {
            return res.status(400).json({
                message: "something went wrong"
            })
        }

        return res.status(200).json({
            message: "product updated successfully!",
            product: updatedProduct
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error!"
        })
    }
}
const deleteProductController = async (req, res) => {
    try {

        let product_id= req.params.product_id;

        if (!product_id) {
            return res.status(404).json({
                message:"product id not found!"
            })
        }


        let deletedProduct = await productModel.findByIdAndDelete(product_id)

        return res.status(200).json({
            message: "product deleted successfully!",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error!"
        })
    }
}

const getProductController = async (req, res) => {
    try {

        let product_id = req.params.product_id;
        const product = await productModel.findById(product_id);

        if (!product) {
            return res.status(404).json({
                message: "product not found"
            })
        }

        return res.status(201).json({
            message: "product detail fetched successfully!",
            product: product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error!"
        })
    }
}
const getProductByCategoryController = async (req, res) => {
    try {

        let category = req.params.category;
        const product = await productModel.find({category});

        if (!product) {
            return res.status(404).json({
                message: "product not found"
            })
        }

        return res.status(201).json({
            message: "product detail fetched successfully!",
            product: product
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error!"
        })
    }
}

module.exports = {
    createProductController,
    getAllProductController,
    updateProductController,
    deleteProductController,
    getProductController,
    getProductByCategoryController
}