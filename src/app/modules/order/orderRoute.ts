import express from 'express'
import { OrderControllers } from './order.controller'

const router = express.Router()

router.post("/new-order", OrderControllers.newOrder)
router.get("/all-orders", OrderControllers.allOrders)


export const OrderRoutes = router