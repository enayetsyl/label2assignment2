"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
const zod_1 = require("zod");
const createProduct = async (req, res) => {
    try {
        const product = req.body;
        const zodParsedData = product_validation_1.productValidationSchema.parse(product);
        const result = await product_service_1.ProductServices.createProductIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: "Product created successfully.",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof zod_1.z.ZodError) {
            const errorMessage = "Validation error: " + error.errors.map((err) => err.message).join(", ");
            res.status(400).json({
                success: false,
                message: errorMessage,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Error in product creation"
            });
        }
    }
};
const allProducts = async (req, res) => {
    try {
        const result = await product_service_1.ProductServices.getAllProductsFromDB();
        res.status(200).json({
            success: true,
            message: "Product fetched successfully.",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in getting all products"
        });
    }
};
const singleProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const result = await product_service_1.ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product fetched successfully.",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in getting product"
        });
    }
};
const updateProduct = async (req, res) => {
    const { productId } = req.params;
    const updateFields = req.body;
    try {
        const zodParsedUpdateField = product_validation_1.productValidationSchema.partial().parse(updateFields);
        const result = await product_service_1.ProductServices.updateSingleProduct(productId, zodParsedUpdateField);
        res.status(200).json({
            success: true,
            message: "Product Updated successfully.",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof zod_1.z.ZodError) {
            const errorMessage = "Validation error" + error.errors.map((err) => err.message).join(", ");
            res.status(400).json({
                success: false,
                message: errorMessage,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Error in updating product"
            });
        }
    }
};
const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        await product_service_1.ProductServices.deleteSingleProduct(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: null
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in deleting product"
        });
    }
};
const searchProduct = async (req, res) => {
    try {
        const searchTerm = req.query.searchTerm ? String(req.query.searchTerm) : '';
        const result = await product_service_1.ProductServices.searchProductsData(searchTerm);
        res.status(200).json({
            success: true,
            message: `Products matching search term '${searchTerm}' fetched successfully!`,
            data: result
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error in searching product"
        });
    }
};
exports.ProductControllers = {
    createProduct, allProducts, singleProduct, updateProduct, deleteProduct, searchProduct
};
