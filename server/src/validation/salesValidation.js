import Joi from "joi";

const saleValidationSchema = Joi.object({
  userId: Joi.string().hex().length(24).required(),

  products: Joi.array().items(
    Joi.object({
      productId: Joi.string().hex().length(24).required(),
      quantity: Joi.number().min(1).required()
    })
  ).min(1).required(),

  customerId: Joi.string().hex().length(24).optional().allow(null),

  paymentMethod: Joi.string()
    .valid("Cash", "Credit Card", "Debit Card", "UPI"),

  totalPrice: Joi.number().min(0).required(),

  date: Joi.date().optional(),

  isPaid: Joi.boolean().optional(),

  isActive: Joi.boolean().optional()
});

export default saleValidationSchema;
