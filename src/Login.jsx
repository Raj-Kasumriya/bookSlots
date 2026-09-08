import "./App.css"
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { useState } from "react";
import { userContexts } from "./App";
import Loading from "./Loading";
import AnimatedMessageBar from "./BookedSlotConfirm";

const Login = () => {

    const { user, setUser } = useContext(userContexts)

    const [goHome, setGoHome] = useState(false)
    const [loading, setLoading] = useState(false)
    const [massage, setMassage] = useState("")

    async function LoginApi(value) {

        setLoading(true)

        const userObj = {
            email: value.email,
            password: value.password
        }


        const urlEncode = new URLSearchParams(userObj).toString();

        await fetch("https://bookslotsapi.onrender.com/auth/login", {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: urlEncode,

        }).then((res) => {
            let data = res.json()
            data.then((user) => {

                console.log(user)

                if (user.success === true) {

                    const UserS = JSON.stringify(user);
                    localStorage.setItem('login-User', UserS);
                    setUser(user.User)
                    setLoading(false)
                    setGoHome(true)
                    return
                }

                if (user.success === false) {
                    setMassage("loginFailed")
                    setLoading(false)
                }

            })
        })

    }



    // Yup Validation Schema
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Enter a valid email address")
            .required("Email is required"),

        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),

    });

    // Formik
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",

        },

        validationSchema,

        onSubmit: (values, { resetForm }) => {
            LoginApi(values);
            resetForm();
        },
    });

    // Input class
    const inputClass = (field) =>
        `w-full px-4 py-3 rounded-lg border outline-none transition ${formik.touched[field] && formik.errors[field]
            ? "border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        }`;



    if (goHome) {
        return <Navigate to="/" />
    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            {loading && <Loading />}
            {massage && <AnimatedMessageBar condition={massage} setSlotBooked={setMassage} />}
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to your account
                    </p>
                </div>

                <form
                    onSubmit={formik.handleSubmit}
                    className="space-y-5"
                >

                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email Address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="example@gmail.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={inputClass("email")}
                        />

                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={inputClass("password")}
                        />

                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.password}
                            </p>
                        )}
                    </div>
                    {/* Forgot Password */}
                    <div className="text-right">
                        <Link
                            to="../forgotPassword"
                            className="text-sm text-blue-600 hover:text-blue-700"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700
                       text-white font-semibold py-3 rounded-lg
                       transition duration-200
                       focus:outline-none focus:ring-2
                       focus:ring-blue-300"
                    >
                        Login
                    </button>

                    {/* Signup */}
                    <p className="text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Create Account
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Login;