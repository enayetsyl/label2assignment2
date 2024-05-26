"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/product/product.route");
const orderRoute_1 = require("./app/modules/order/orderRoute");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.use("/api/products", product_route_1.ProductRoutes);
app.use("/api/orders", orderRoute_1.OrderRoutes);
app.get('*', (req, res) => {
    res.json({
        "success": false,
        "message": "Route not found"
    });
});
app.get('/', (req, res) => {
    res.json({
        "success": true,
        "message": "Hello"
    });
});
exports.default = app;
