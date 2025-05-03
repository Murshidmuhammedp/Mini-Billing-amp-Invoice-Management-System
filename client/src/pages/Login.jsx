import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../Validation/LoginValidation";
import customAxios from "../api/axiosInstance";
import toast from "react-hot-toast";


export default function Login() {

    const navigate = useNavigate();
    const { handleChange, handleBlur, values, errors, handleSubmit } = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            try {
                const response = await customAxios.post("/api/auth/login", values)
                if (response.data.accessToken) {
                    localStorage.setItem("token", response.data.accessToken);
                    toast.success("Login successful!");
                    navigate("/dashboard");
                }
            } catch (error) {
                console.error("Login failed", error)
            }
        }
    })

    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
            <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">

                <div className="md:w-1/2 w-full p-6 flex items-center justify-center bg-white">
                    <img
                        src="/Inventrylogin.png"
                        alt="Login Illustration"
                        className="w-full max-w-sm"
                    />
                </div>

                <div className="md:w-1/2 w-full p-6">
                    <div className="text-[31px] font-semibold text-[#2A586F] mb-5 relative inline-block">
                        <h1 className="relative z-50">Login</h1>
                        <span className="absolute left-0 bottom-1 w-full h-2 bg-[#fac166] z-0"></span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <label className="text-[18px] font-bold">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            className="w-full p-2 mt-2 border-2 border-gray-300 rounded-md outline-none"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                        <label className="text-[18px] font-bold mt-4 block">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            className="w-full p-2 mt-2 border-2 border-gray-300 rounded-md outline-none"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password &&
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        }

                        <button
                            type="submit"
                            className="w-full mt-6 py-2 text-white bg-[#2A586F] border-2 border-[#2A586F] font-semibold text-sm rounded-md hover:bg-transparent hover:text-[#2A586F] transition-all"
                        >
                            Login
                        </button>

                        <small className="block text-center mt-4">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-blue-600">
                                Register Now
                            </Link>
                        </small>
                    </form>
                </div>
            </div>
        </div>
    );
}
