import express from 'express'
import { OrderControllers } from './order.controller'

const router = express.Router()

router.post("/new-order", OrderControllers.newOrder)


export const OrderRoutes = router