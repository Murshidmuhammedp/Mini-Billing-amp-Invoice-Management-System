import Customer from "../models/customerSchema.js";
import Sale from "../models/salesSchema.js";
import Product from "../models/productSchema.js";

export const getDashboardData = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const totalCustomers = await Customer.countDocuments();
        const totalSales = await Sale.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalRevenue = await Sale.aggregate([
            { $match: { userId } },
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);
        const monthlySales = await Sale.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$date" } },
                    totalSales: { $sum: "$totalPrice" },
                    totalOrders: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const latestProducts = await Product.find({ userId })
            .sort({ createdAt: -1 })
            .limit(4)
            .select("productName description quantity price")
            .lean();

        const latestCustomers = await Customer.find({ userId })
            .sort({ createdAt: -1 })
            .limit(4)
            .select("name email mobileNumber")
            .lean();

        res.status(200).json({
            message: "Data fetched",
            data: {
                totalCustomers,
                totalSales,
                totalProducts,
                totalRevenue,
                monthlySales,
                latestProducts,
                latestCustomers
            }
        });
    } catch (error) {
        next(error);
    }
};