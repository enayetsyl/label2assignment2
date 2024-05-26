"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("./product.model");
const createProductIntoDB = async (product) => {
    const result = await product_model_1.ProductModel.create(product);
    return result;
};
const getAllProductsFromDB = async () => {
    const result = await product_model_1.ProductModel.find();
    return result;
};
const getSingleProductFromDB = async (id) => {
    const result = await product_model_1.ProductModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
    return result;
};
const updateSingleProduct = async (productId, updateFields) => {
    const result = await product_model_1.ProductModel.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(productId) }, { $set: updateFields }, { new: true });
    return result;
};
const deleteSingleProduct = async (id) => {
    const result = await product_model_1.ProductModel.findOneAndDelete({ _id: new mongoose_1.default.Types.ObjectId(id) });
    return result;
};
const searchProductsData = async (searchTerm) => {
    const result = await product_model_1.ProductModel.find({ name: { $regex: searchTerm, $options: 'i' } });
    return result;
};
exports.ProductServices = {
    createProductIntoDB, getAllProductsFromDB, getSingleProductFromDB, updateSingleProduct, deleteSingleProduct, searchProductsData
};
