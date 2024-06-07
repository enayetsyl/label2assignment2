import { OrderControllers } from './order.controller'
import express, { Request, Response, NextFunction } from 'express';
const router = express.Router()

const handleEmail = async (req: Request, res: Response, next: NextFunction) => {
  // Check if the email parameter exists in the query
  if (req.query.email) {
      // If email parameter exists, call getEmailOrder controller function
      await OrderControllers.getEmailOrder(req, res);
  } else {
      // If email parameter doesn't exist, call allOrders controller function
      await OrderControllers.allOrders(req, res);
  }
};

router.post("/", OrderControllers.newOrder)
router.get("/", handleEmail);


export const OrderRoutes = router


