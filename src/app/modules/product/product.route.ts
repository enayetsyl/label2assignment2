import express from 'express'
import { ProductControllers } from './product.controller'

const router = express.Router()

router.post("/create-product", ProductControllers.createProduct)

router.get("/all-products", ProductControllers.allProducts)

router.get("/:productId", ProductControllers.singleProduct)


export const ProductRoutes = router;