import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productName: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
    isListed: { type: Boolean, default: true },
}, { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;