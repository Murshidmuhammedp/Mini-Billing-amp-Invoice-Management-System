import Product from "../models/productSchema.js";
import productValidationSchema from "../validation/productValidation.js";

export const addNewProduct = async (req, res, next) => {
    try {
        const { error } = productValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const userId = req.user?.id;
    
        const { productName, description, quantity, price, isListed } = req.body;

        const existingProduct = await Product.findOne({ productName });
        if (existingProduct) {
            return res.status(409).json({ message: "Product already added" });
        }

        const newProduct = new Product({
            userId,
            productName,
            description,
            quantity,
            price,
            isListed
        });
        await newProduct.save();

        return res.status(200).json({
            message: "Product Added Successfully",
            product: newProduct,
        });
    } catch (error) {
        next(error);
    }
};

export const getAllProducts = async (req, res, next) => {
    try {

        const products = await Product.find();
        return res.status(200).json({ products });
    } catch (error) {
        next(error);
    }
};


export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not Found" });
        }

        return res.status(200).json({ product });
    } catch (error) {
        next(error);
    }
};


export const updateProduct = async (req, res, next) => {
    try {

        const { id } = req.params;
        const { productName, description, quantity, price, isListed } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { productName, description, quantity, price, isListed },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product Not Found" });
        }

        return res.status(200).json({
            message: "Product Updated",
            product: updatedProduct,
        });
    } catch (error) {
        next(error);
    }
};


export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not Found" });
        }

        return res.status(200).json({
            message: "Product Deleted",
            product: deletedProduct,
        });
    } catch (error) {
        next(error);
    }
};

export const productblock = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not Found"});
        }

        product.isListed = !product.isListed;
        await product.save();

        return res.status(200).json({
            message: product.isListed ? "Listed" : "Unlisted",
            product,
        });
    } catch (error) {
        next(error);
    }
};
