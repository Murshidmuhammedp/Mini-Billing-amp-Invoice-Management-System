import * as Yup from 'yup';

export const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),

    email: Yup.string()
        .trim()
        .email("Invalid email format")
        .required("Email is required"),

    password: Yup.string()
        .trim()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});
