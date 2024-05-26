"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailSchema = void 0;
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    productId: zod_1.z.string(),
    price: zod_1.z.number().positive().min(1),
    quantity: zod_1.z.number().int().positive().min(1)
});
exports.EmailSchema = zod_1.z.string().email();
exports.default = orderValidationSchema;
