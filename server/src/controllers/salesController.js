import Sale from "../models/salesSchema.js";

export const addInvoice = async (req, res, next) => {
    try {
        const { customerId, products, totalPrice, isPaid } = req.body;

        if (!products || products.length === 0) {
            return res.status(400).json({ error: "Products are required" });
        }
        const newSale = new Sale({
            userId: req.user,
            customerId: customerId || null,
            products,
            totalPrice,
            isPaid: false
        });

        await newSale.save();
        return res.status(201).json({ message: "Sale invoice created successfully", sale: newSale });

    } catch (error) {
        next(error);
    }
};

export const getAllSales = async (req, res, next) => {
    try {
        const userId = req.user;
        if (!userId) {
            return res.status(404).json({ message: "User not Authenticated" });
        }

        const sales = await Sale.find({ userId })
            .populate("products.productId customerId")
            .sort({ date: -1 });

        return res.status(200).json({ sales });
    } catch (error) {
        next(error);
    }
};

export const deleteSale = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedSale = await Sale.findByIdAndDelete(id);

        if (!deletedSale) {
            return res.status(404).json({ message: "Sale not found" });
        }

        return res.status(200).json({ message: "Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};

export const updateSaleIsPaid = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { isPaid } = req.body;

        const sale = await Sale.findById(id);
        if (!sale) {
            return res.status(404).json({ message: "Invoice not Found" });
        }
        if (typeof isPaid === "string") {
            sale.isPaid = isPaid.toLowerCase() === "paid";
        } else {
            sale.isPaid = Boolean(isPaid);
        }
      
        await sale.save();

        return res.status(200).json({
            message: "Status Updated",
            sale,
        });
    } catch (error) {
        next(error);
    }
};

export const updateSaleIsActive = async (req, res, next) => {
    try {
        const { id } = req.params;

        const sale = await Sale.findById(id);
        if (!sale) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        console.log(sale, "prbm")
        sale.isActive = !sale.isActive;
        await sale.save();

        return res.status(200).json({
            message: "Active Status Updated",
            sale,
        });
    } catch (error) {
        next(error);
    }
};
