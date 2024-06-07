"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const order_controller_1 = require("./order.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const handleEmail = async (req, res, next) => {
    // Check if the email parameter exists in the query
    if (req.query.email) {
        // If email parameter exists, call getEmailOrder controller function
        await order_controller_1.OrderControllers.getEmailOrder(req, res);
    }
    else {
        // If email parameter doesn't exist, call allOrders controller function
        await order_controller_1.OrderControllers.allOrders(req, res);
    }
};
router.post("/", order_controller_1.OrderControllers.newOrder);
router.get("/", handleEmail);
exports.OrderRoutes = router;
