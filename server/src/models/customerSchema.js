import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, lowercase: true },
        mobileNumber: { type: String, required: true },
        isBlocked: { type: Boolean, default: false },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            zipCode: { type: String, required: true },
            country: { type: String, required: true },
        },
    },
    { timestamps: true }
);

const Customer = mongoose.model('Customer', CustomerSchema);

export default Customer
