import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  password: Yup.string().required("Password is required")
});
