import mongoose from "mongoose";

const SaleSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, required: true },
            }
        ],
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: false },
        paymentMethod: { type: String, enum: ["Cash", "Credit Card", "Debit Card", "UPI"], required: true },
        totalPrice: { type: Number, required: true },
        isPaid: { type: Boolean, default: true },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const Sale = mongoose.model("Sale", SaleSchema);
export default Sale;
