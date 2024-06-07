import express from 'express'
import { OrderControllers } from './order.controller'

const router = express.Router()

router.post("/", OrderControllers.newOrder)
router.get("/", OrderControllers.getEmailOrder)
router.get("/", OrderControllers.allOrders)


export const OrderRoutes = router