import mongoose from "mongoose";
import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product: Product) => {
const result = await ProductModel.create(product)

return result;
}


const getAllProductsFromDB = async () =>{
  const result = await ProductModel.find()

  return result;
}

const getSingleProductFromDB = async(id: string) => {
  const result =await ProductModel.findOne({_id: new mongoose.Types.ObjectId(id)})

  return result
}

const updateSingleProduct = async (productId: string, updateFields: Partial<Product>) => {
  console.log('pr', productId, updateFields)
  const result = await ProductModel.findOneAndUpdate(
    {_id: new mongoose.Types.ObjectId(productId) },
    {$set: updateFields},
    {new: true}
  )
  return result;
}

const deleteSingleProduct = async(id: string) => {
  const result = await ProductModel.findOneAndDelete({_id: new mongoose.Types.ObjectId(id)})
  return result ;
}

const searchProductsData = async (searchTerm: string) => {
  const result = await ProductModel.find({ name: {$regex: searchTerm, $options: 'i'}})
  return result
}


export const ProductServices = {
  createProductIntoDB, getAllProductsFromDB, getSingleProductFromDB, updateSingleProduct, deleteSingleProduct, searchProductsData
}