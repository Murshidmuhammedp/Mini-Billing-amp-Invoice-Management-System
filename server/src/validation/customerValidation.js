import Joi from 'joi';

const customerValidationSchema = Joi.object({
    userId: Joi.string(),
    name: Joi.string().trim().min(3).max(100).required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .required(),
    isBlocked: Joi.boolean().optional(),
    address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        zipCode: Joi.string().required(),
        country: Joi.string().required(),
    }).required(),
});

export default customerValidationSchema;
