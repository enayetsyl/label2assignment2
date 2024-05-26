"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createSingleOrder = async (orderData) => {
    const productData = await product_model_1.ProductModel.findById({
        _id: new mongoose_1.default.Types.ObjectId(orderData.productId),
    });
    if (productData && productData.inventory.quantity < orderData.quantity) {
        throw new Error("Insufficient quantity available in inventory");
    }
    const result = await order_model_1.OrderModel.create(orderData);
    const inventoryAdjust = await product_model_1.ProductModel.findByIdAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(orderData.productId) }, { $inc: { "inventory.quantity": -orderData.quantity } });
    console.log(inventoryAdjust);
    if (inventoryAdjust &&
        inventoryAdjust?.inventory.quantity - orderData.quantity == 0) {
        await product_model_1.ProductModel.findByIdAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(orderData.productId) }, { $set: { "inventory.inStock": false } });
    }
    return result;
};
const getAllOrders = async () => {
    const result = await order_model_1.OrderModel.find();
    return result;
};
const getOrdersByEmail = async (email) => {
    const result = await order_model_1.OrderModel.find({ email });
    return result;
};
exports.OrderServices = {
    createSingleOrder,
    getAllOrders,
    getOrdersByEmail,
};
