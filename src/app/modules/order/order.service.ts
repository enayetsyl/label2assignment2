import mongoose from "mongoose";
import { ProductModel } from "../product/product.model";
import { Order } from "./order.interface";
import { OrderModel } from "./order.model";

const createSingleOrder = async (orderData: Order) => {
  const productData = await ProductModel.findById({
    _id: new mongoose.Types.ObjectId(orderData.productId),
  });

  if (productData && productData.inventory.quantity < orderData.quantity) {
    throw new Error("Insufficient quantity available in inventory");
  }

  const result = await OrderModel.create(orderData);

  const inventoryAdjust = await ProductModel.findByIdAndUpdate(
    { _id: new mongoose.Types.ObjectId(orderData.productId) },
    { $inc: { "inventory.quantity": -orderData.quantity } }
  );
  console.log(inventoryAdjust);
  if (
    inventoryAdjust &&
    inventoryAdjust?.inventory.quantity - orderData.quantity == 0
  ) {
    await ProductModel.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(orderData.productId) },
      { $set: { "inventory.inStock": false } }
    );
  }
  return result;
};

const getAllOrders = async () => {
  const result = await OrderModel.find();
  return result;
};

const getOrdersByEmail = async (email: string) => {
  const result = await OrderModel.find({ email });
  return result;
};

export const OrderServices = {
  createSingleOrder,
  getAllOrders,
  getOrdersByEmail,
};
