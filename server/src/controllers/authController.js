import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import User from '../models/userSchema.js';
import { loginValidationSchema, userValidationSchema } from '../validation/userValidation.js';

export const registerUser = async (req, res, next) => {
    try {
        const { error } = userValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "E-mail already registered" });
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json({ message: "Registered successfully", data: newUser });

    } catch (error) {
        next(error)
    };
};

export const loginUser = async (req, res, next) => {
    try {
        const { error } = loginValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { email, password } = req.body;
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return res.status(401).json({ success: false, message: "User not found." });
        };

        const validpassword = bcrypt.compareSync(password, validUser.password);
        if (!validpassword) {
            return res.status(401).json({ success: false, message: "Invalid username or password." });
        };

        if (validUser.isBlocked == true) {
            return res.status(400).json({ success: false, message: "Your account is suspended." });
        };

        const accessToken = Jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 60 * 1000)
        });
        return res.status(200).json({ message: "successfully logged in", accessToken, name: validUser });
    } catch (error) {
        next(error);
    }
};

export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie("accessToken");
        res.status(200).json({ message: "User logged out successfully." });
    } catch (error) {
        next(error);
    }
}