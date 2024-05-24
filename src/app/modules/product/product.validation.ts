import { z } from "zod";

const variantsValidationSchema = z.object({
  type: z.string(),
  value: z.string()
})
export const  productValidationSchema = z.object({
  name: z.string().min(1).max(30),
  description: z.string().min(1).max(1500),
  price: z.number().positive().min(1),
  category: z.string().min(1).max(100),
  tags: z.array(z.string()),
  variants: z.array(variantsValidationSchema),
  inventory: z.object({
    quantity: z.number().positive(),
    inStock: z.boolean()
  })
})


