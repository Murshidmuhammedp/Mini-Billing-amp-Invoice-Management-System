import Joi from "joi";

const productValidationSchema = Joi.object({
  userId: Joi.string(),
  productName: Joi.string().trim().min(2).max(100).required(),
  description: Joi.string().trim().min(5).max(1000).required(),
  quantity: Joi.number().min(0).required(),
  price: Joi.number().min(0).required(),
  isListed: Joi.boolean().optional(),
});

export default productValidationSchema;
