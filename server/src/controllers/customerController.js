import Customer from "../models/customerSchema.js";
import customerValidationSchema from "../validation/customerValidation.js";

export const addNewCustomer = async (req, res, next) => {
    try {
        const { error } = customerValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { name, email, mobileNumber, address } = req.body;
        const userId = req.user?.id;
        const existingCustomer = await Customer.findOne({ userId, email });
        const existingMobileNumber = await Customer.findOne({ userId, mobileNumber });
        
        if (existingCustomer) {
            return res.status(200).json({ message: "E-mail already registered" });
        }
        
        if (existingMobileNumber) {
            return res.status(200).json({ message: "Mobile Number already registered" });
        }
        
        const newCustomer = new Customer({
            userId,
            name,
            email,
            mobileNumber,
            address
        });
        await newCustomer.save();

        return res.status(201).json({
            message: "Customer created successfully.",
            customer: newCustomer,
        });

    } catch (error) {
        next(error);
    }
};

export const getAllCustomers = async (req, res, next) => {
    try {
        // const userId = req.user?.id;
        // if (!userId) {
        //     return res.status(401).json({ message: "Unautherized" });
        // }

        const customers = await Customer.find();
        return res.status(201).json({ customers });
    } catch (error) {
        next(error);
    }
};


export const getCustomerById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({ message: "Customer not Found" });
        }

        return res.status(201).json({ customer });
    } catch (error) {
        next(error);
    }
};

export const updateCustomer = async (req, res, next) => {
    try {

        const { id } = req.params;
        const { email, mobileNumber } = req.body;

        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer Not Found" });
        }

        if (email && email !== customer.email) {
            const existingCustomer = await Customer.findOne({ email, _id: { $ne: id } });
            if (existingCustomer) {
                return res.status(409).json({ message: "Already Used this Email Id" });
            }
        }

        if (mobileNumber && mobileNumber !== customer.mobileNumber) {
            const existingMobile = await Customer.findOne({ mobileNumber, _id: { $ne: id } });
            if (existingMobile) {
                return res.status(409).json({ message: "Mobile Number Already Used" });
            }
        }

        const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, { new: true });

        return res.status(202).json({
            message: "Updated Successfully",
            customer: updatedCustomer,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedCustomer = await Customer.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return res.status(404).json({ message: "Customer not Found" });
        }

        return res.status(201).json({ message: "Deleted Successfully" });
    } catch (error) {
        next(error);
    }
};


export const blockCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;

        const customer = await Customer.findById(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not Found" });
        }

        customer.isBlocked = !customer.isBlocked;
        await customer.save();

        return res.status(200).json({
            message: customer.isBlocked ? "Blocked" : "Unblocked",
            customer,
        });
    } catch (error) {
        next(error);
    }
};
