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

const allProducts = async(req: Request, res: Response) => {
try {
  const result = await ProductServices.getAllProductsFromDB()
  res.status(200).json({
    success: true,
    message: "Product fetched successfully.",
    data: result,
  })

} catch (error) {
   console.log(error)
    res.status(500).json({
      success:false,
      message: "Error in getting all products"
    })
}
}


const singleProduct = async(req:Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await ProductServices.getSingleProductFromDB(productId)

    res.status(200).json({
      success: true,
      message: "Product fetched successfully.",
      data: result,
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message: "Error in getting all products"
    })
  }
}


export const ProductControllers ={
  createProduct, allProducts, singleProduct
}