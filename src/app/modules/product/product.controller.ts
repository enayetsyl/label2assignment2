import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { stdout } from "process";
import { Product } from "./product.interface";
import { ProductModel } from "./product.model";


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
      message: "Error in getting product"
    })
  }
}

const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params
  const updateFields: Partial<Product> = req.body;
  try {
    const result = await ProductServices.updateSingleProduct(productId, updateFields)
    res.status(200).json({
      success: true,
      message: "Product Updated successfully.",
      data: result,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message: "Error in updating product"
    })
  }
}


const deleteProduct = async(req:Request, res: Response) => {
  const { productId } = req.params;
  try {
    const result = await ProductServices.deleteSingleProduct(productId)
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: null
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message: "Error in deleting product"
    })
  }
}


export const ProductControllers ={
  createProduct, allProducts, singleProduct, updateProduct, deleteProduct
}