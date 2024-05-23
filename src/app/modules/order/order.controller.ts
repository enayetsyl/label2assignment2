import { Request, Response } from "express";
import { OrderServices } from "./order.service";

const newOrder = async (req: Request, res: Response) => {
  const orderData = req.body;
  try {
    const result = await OrderServices.createSingleOrder(orderData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    if (
      error &&
      error instanceof Error &&
      error.message === "Insufficient quantity available in inventory"
    ) {
      res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Error in order creating",
      });
    }
  }
};

export const OrderControllers = {
  newOrder,
};
