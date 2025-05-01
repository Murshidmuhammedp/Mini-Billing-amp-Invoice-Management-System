import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    fullName: Yup.string()
        .trim()
        .min(3, "Full name must be at least 3 characters")
        .required("Full name is required"),

    email: Yup.string()
        .trim()
        .email("Invalid email format")
        .required("Email is required"),

    mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
        .required("Mobile number is required"),

    status: Yup.string()
        .oneOf(["employee", "student"], "Invalid status")
        .required("Status is required"),

    password: Yup.string()
        .trim()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});
