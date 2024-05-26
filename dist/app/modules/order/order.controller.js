"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_service_1 = require("./order.service");
const zod_1 = require("zod");
const order_validation_1 = __importStar(require("./order.validation"));
const newOrder = async (req, res) => {
    const orderData = req.body;
    try {
        const zodParsedData = order_validation_1.default.parse(orderData);
        const result = await order_service_1.OrderServices.createSingleOrder(zodParsedData);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            // Zod validation error occurred
            const errorMessage = "Validation error: " + error.errors.map((err) => err.message).join(", ");
            res.status(400).json({
                success: false,
                message: errorMessage,
            });
        }
        else if (error instanceof Error &&
            error.message === "Insufficient quantity available in inventory") {
            // Error specific to insufficient quantity available in inventory
            res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
        }
        else {
            // Other errors occurred (e.g., database error)
            res.status(500).json({
                success: false,
                message: "Error in order creation",
            });
        }
    }
};
const allOrders = async (req, res) => {
    try {
        const result = await order_service_1.OrderServices.getAllOrders();
        if (result.length < 1) {
            res.status(200).json({
                success: false,
                message: "Order not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully",
                data: result
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            "success": false,
            "message": "An error occur"
        });
    }
};
const getEmailOrder = async (req, res) => {
    const email = order_validation_1.EmailSchema.parse(req.query.email);
    try {
        const result = await order_service_1.OrderServices.getOrdersByEmail(email);
        if (result.length < 1) {
            res.status(200).json({
                success: false,
                message: "Orders not found for user email!",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully for user email!",
                data: result
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Orders could not fetched for user email!",
        });
    }
};
exports.OrderControllers = {
    newOrder, allOrders, getEmailOrder
};
