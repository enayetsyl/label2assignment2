import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { ProductRoutes } from './app/modules/product/product.route'
import { OrderRoutes } from './app/modules/order/orderRoute'
const app: Application = express()

app.use(express.json())
app.use(cors())

// Routes
app.use("/api/products", ProductRoutes)
app.use("/api/orders", OrderRoutes)

app.get('*', (req: Request, res: Response) => {
  res.json({
    "success": false,
    "message": "Route not found"
   })
})
app.get('/', (req: Request, res: Response) => {
  res.json({
    "success": false,
    "message": "Hello"
   })
})

export default app
