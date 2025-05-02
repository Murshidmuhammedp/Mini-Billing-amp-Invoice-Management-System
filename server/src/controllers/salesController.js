import Sale from "../models/salesSchema";

export const salesInvoice = async (req, res) => {
    try {
        const { customerId, products, totalPrice, isPaid } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ error: "Products are required" });
        }

        const newSale = new Sale({
            userId: req.user?.id,
            customerId: customerId || null,
            products,
            totalPrice,
            isPaid
        });

        await newSale.save();
        return res.status(201).json({ message: "Sale invoice created successfully", sale: newSale });

    } catch (error) {
        next(error);
    }
};
