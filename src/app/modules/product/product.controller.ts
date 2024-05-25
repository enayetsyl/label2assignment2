import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { Product } from "./product.interface";
import { productValidationSchema } from "./product.validation";
import { z } from "zod";


const createProduct = async (req: Request, res: Response) => {
  try {
  const product = req.body

  const zodParsedData = productValidationSchema.parse(product)

  const result = await ProductServices.createProductIntoDB(zodParsedData)

  res.status(200).json({
    success: true,
    message: "Product created successfully.",
    data: result,
  })
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      const errorMessage = "Validation error: " + error.errors.map((err) => err.message).join(", ");
      res.status(400).json({
        success: false,
        message: errorMessage,
      });
    } else {
      res.status(500).json({
        success:false,
        message: "Error in product creation"
      })
      
    }
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
    const zodParsedUpdateField = productValidationSchema.partial().parse(updateFields)
    const result = await ProductServices.updateSingleProduct(productId, zodParsedUpdateField)
    res.status(200).json({
      success: true,
      message: "Product Updated successfully.",
      data: result,
    })
  } catch (error) {
    console.log(error)
    if (error instanceof z.ZodError) {
      const errorMessage = "Validation error" + error.errors.map((err)=> err.message).join(", ");
      res.status(400).json({
        success: false,
        message: errorMessage,
      });
    } else {
      res.status(500).json({
        success:false,
        message: "Error in updating product"
      })
    }
  }
}


const deleteProduct = async(req:Request, res: Response) => {
  const { productId } = req.params;
  try {
     await ProductServices.deleteSingleProduct(productId)
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

const searchProduct = async(req:Request, res: Response) => {
  try {
     const searchTerm: string = req.query.searchTerm ? String(req.query.searchTerm) : ''
    const result = await ProductServices.searchProductsData(searchTerm)

    res.status(200).json({
      success: true,
      message: `Products matching search term '${searchTerm}' fetched successfully!`,
      data: result
    })


  } catch (error) {
    console.log(error)
    res.status(500).json({
      success:false,
      message: "Error in searching product"
    })
  }
}



export const ProductControllers ={
  createProduct, allProducts, singleProduct, updateProduct, deleteProduct, searchProduct
}