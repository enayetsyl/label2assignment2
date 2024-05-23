import { z } from "zod";

const orderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number().positive().min(1),
  quantity: z.number().int().positive().min(1)
})

export const EmailSchema = z.string().email();


export default orderValidationSchema