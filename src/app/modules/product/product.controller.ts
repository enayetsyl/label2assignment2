import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { stdout } from "process";


const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body

  const result = await ProductServices.createProductIntoDB(product)

  res.status(200).json({
    success: true,
    message: "Product created successfully.",
    data: result,
  })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message: "Error in product creation"
    })
  }

}

export const ProductControllers ={
  createProduct
}