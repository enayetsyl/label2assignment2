import express from 'express'
import { ProductControllers } from './product.controller'

const router = express.Router()

router.post("/create-product", ProductControllers.createProduct)

router.get("/all-products", ProductControllers.allProducts)

router.get("/:productId", ProductControllers.singleProduct)

router.put("/:productId", ProductControllers.updateProduct)

router.delete("/:productId", ProductControllers.deleteProduct)

router.get("/", ProductControllers.searchProduct)


export const ProductRoutes = router;