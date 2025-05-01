import { JSX, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import customAxios from "../Api/axiosInstatnce";
import { useFormik } from "formik";
import { loginSchema } from "../Validation/LoginValidation";


export default function Login() {

  const { handleChange, handleBlur, values, errors, handleSubmit } = useFormik({
    initialValues: {
      mobile: "",
      password: ""
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        // const response = await customAxios.post("/api/auth/login", values)
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          alert("Login successful!");
          navigate("/question");
        }
      } catch (error) {
        console.log(error)
      }
    }
  })
 

  const navigate = useNavigate();

  return (
    <div className="w-full flex-1  flex-col flex justify-center items-center gap-10 ">
      <div className="relative inline-block text-[31px] font-semibold text-[#2A586F] ">
        <h1 className="relative z-50">Login</h1>
        <span className="absolute left-0 bottom-1 w-full h-2 bg-[#fac166] z-0 "></span>
      </div>

      <form className="p-5 flex flex-col  shadow-lg " onSubmit={handleSubmit}>
        <label className="text-[18px] font-bold">Email</label>
        <div className="flex gap-2 flex-row">


          <input
            type="tel"
            placeholder="Enter mobile number"
            className="flex-1 p-2 outline-none text-gray-700 border-2 border-[#c4c4c4] rounded-md mt-2 "
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            name="mobile"
          />

        </div>
          {errors.mobile && <p className="text-red-500 text-sm mt-2">{errors.mobile}</p>}

        <label className="text-[18px] font-bold mt-4 ">Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          className="flex-1 p-2 outline-none text-gray-700 border-2 border-[#c4c4c4] rounded-md mt-2   "
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
        />
        {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
        <button
          type="submit"
          className="mt-8 py-2 font-semibold text-[14px] bg-[#2A586F]  text-white border-2 border-[#2A586F] hover:bg-transparent hover:text-[#2A586F] rounded-md">
          Login
        </button>

        <small className="text-center mt-5">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-600">
            Register Now
          </Link>
        </small>
      </form>
    </div>
  );
}
