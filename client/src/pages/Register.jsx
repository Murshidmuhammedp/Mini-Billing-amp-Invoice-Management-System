import { JSX, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import customAxios from "../Api/axiosInstatnce";
import { useFormik } from "formik";
import { RegisterSchema } from "../Validation/RegisterValidation";

export default function Register() {

  const { handleChange, handleBlur, values, errors, handleSubmit } = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      mobile: "",
      status: "",
      password: ""
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        // const response = await customAxios.post("/api/auth/register", values)
        alert(response.data.message)
        navigate('/login')
      } catch (error) {
        console.log(error)
      }
    }
  })


  const navigate = useNavigate();

  return (
    <div className="w-full flex-1  flex-col flex justify-center items-center   ">
      <div className="relative inline-block text-[31px] font-bold  ">
        <h1 className="relative z-50">Register</h1>
        <span className="absolute left-0 bottom-1 w-full h-2 bg-[#fac166] z-0 "></span>
      </div>

      <form className="p-4 flex flex-col shadow-lg" onSubmit={handleSubmit}>
        <label className="text-[18px] font-bold mt-3 ">Full Name</label>
        <input
          type="text"
          className="flex-1 p-2 outline-none text-gray-700 border-2 border-[#c4c4c4] rounded-md mt-2   "
          placeholder="Enter your name"
          value={values.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          name="fullName"
        />
        {errors.fullName && <p className="text-red-500 text-sm mt-2">{errors.fullName}</p>}

        <label className="text-[18px] font-bold mt-3 ">Email</label>
        <input
          type="text"
          className="flex-1 p-2 outline-none text-gray-700 border-2 border-[#c4c4c4] rounded-md mt-2   "
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          name="email"
        />
        {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
        <label className="text-[18px] font-semibold  mt-2 ">
          Mobile Number
        </label>
        <div className="flex gap-2 flex-row  ">

          <input
            type="tel"
            placeholder="Enter your phone number"
            className=" p-2 md:pl-10 outline-none text-gray-700 border-2 border-[#c4c4c4] rounded-md mt-2 "
            value={values.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            name="mobile"
          />
        </div>
        {errors.mobile && <p className="text-red-500 text-sm mt-2">{errors.mobile}</p>}
        <label className="text-[18px] font-bold mt-3 ">Current Status</label>
        <div className="flex gap-4 items-center">
          {/* Student */}
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="status"
              value="student"
              className="hidden group-[&:checked]:bg-[#2A586F]"
              checked={values.status === "student"}
              onChange={handleChange}
              onBlur={handleBlur} />
            <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center group-has-[:checked]:border-[#2A586F]">
              <div className="w-2.5 h-2.5 bg-gray-400 rounded-full group-has-[:checked]:bg-[#2A586F]"></div>
            </div>
            <span className="text-black">Student</span>
          </label>

          {/* Employee */}
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="status"
              value="employee"
              className="hidden"
              checked={values.status === "employee"}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center group-has-[:checked]:border-[#2A586F]">
              <div className="w-2.5 h-2.5 bg-gray-400 rounded-full group-has-[:checked]:bg-[#2A586F]"></div>
            </div>
            <span className="text-black">Employee</span>
          </label>
        </div>
        {errors.status && <p className="text-red-500 text-sm mt-2">{errors.status}</p>}

        <label className="text-[18px] font-bold mt-3 ">Password</label>
        <input
          type="password"
          className="flex-1 p-2 outline-none text-gray-700 border-2 border-[#c4c4c4] rounded-md mt-2"
          placeholder="Enter Password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          name="password"
        />
        {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
        <button
          type="submit"
          className="mt-5 py-2 font-semibold text-[14px] bg-[#2A586F]  text-white border-2 border-[#2A586F] hover:bg-transparent hover:text-[#2A586F] rounded-md">
          Save
        </button>
        <small className="text-center mt-3">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600">
            Login Now
          </Link>
        </small>
      </form>
    </div>
  );
}
