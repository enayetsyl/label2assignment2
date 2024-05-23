import { Schema, model, connect } from 'mongoose';
import { Product, Product, Variants } from './product.interface';


const variantSchema = new Schema<Variants>({
  type: {type: String, required: true},
  value: {type: String, required: true},
})

const productSchema = new Schema<Product>({
  name: {type: String, required: true},
  description: {type: String, required: true},
  price: {type: Number, required: true},
  category: {type: String, required: true},
  tags: [{type: String}],
  variants: [variantSchema],
  inventory:{
    quantity:{type: Number, required: true},
    inStock: {type: Boolean, required: true},
  }
})


export const ProductModel = model<Product>('Product', productSchema)
