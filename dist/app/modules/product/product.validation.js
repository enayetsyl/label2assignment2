"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
const variantsValidationSchema = zod_1.z.object({
    type: zod_1.z.string(),
    value: zod_1.z.string()
});
exports.productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(30),
    description: zod_1.z.string().min(1).max(1500),
    price: zod_1.z.number().positive().min(1),
    category: zod_1.z.string().min(1).max(100),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(variantsValidationSchema),
    inventory: zod_1.z.object({
        quantity: zod_1.z.number().positive(),
        inStock: zod_1.z.boolean()
    })
});
