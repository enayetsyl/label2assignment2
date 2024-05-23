import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import { z } from "zod";
import orderValidationSchema, { EmailSchema } from "./order.validation";

const newOrder = async (req: Request, res: Response) => {
  const orderData = req.body;
  try {
    const zodParsedData = orderValidationSchema.parse(orderData)
    const result = await OrderServices.createSingleOrder(zodParsedData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Zod validation error occurred
      const errorMessage = "Validation error: " + error.errors.map((err) => err.message).join(", ");
      res.status(400).json({
        success: false,
        message: errorMessage,
      });
    } else if (
      error instanceof Error &&
      error.message === "Insufficient quantity available in inventory"
    ) {
      // Error specific to insufficient quantity available in inventory
      res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    } else {
      // Other errors occurred (e.g., database error)
      res.status(500).json({
        success: false,
        message: "Error in order creation",
      });
    }}
};

const allOrders = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.getAllOrders()
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: result
    })
  } catch (error) {
    console.log(error)
   
      res.status(500).json({
        
          "success": false,
          "message": "Order not found"
         
      })

  }
}

const getEmailOrder = async (req: Request, res: Response) => {

  const email: string = EmailSchema.parse(req.query.email as string)

  try {
    const result = await OrderServices.getOrdersByEmail(email)
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully for user email!",
      data: result
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Orders could not fetched for user email!",
      })
  }
}


export const OrderControllers = {
  newOrder,allOrders, getEmailOrder
};
