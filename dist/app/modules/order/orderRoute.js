"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post("/new-order", order_controller_1.OrderControllers.newOrder);
router.get("/all-orders", order_controller_1.OrderControllers.allOrders);
router.get("/", order_controller_1.OrderControllers.getEmailOrder);
exports.OrderRoutes = router;