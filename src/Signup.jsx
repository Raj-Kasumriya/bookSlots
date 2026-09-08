import "./App.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { userContexts } from "./App";
import { useState } from "react";

const Signup = () => {



    const { setUser } = useContext(userContexts)
    const [goHome, setGoHome] = useState(false)

    async function SignupApi(value) {


        console.log(value)

        const requiredF = {
            email: value.email,
            password: value.password,
            phone: value.phone,
            role: value.role,
            name: value.firstName,
            lastName: value.lastName
        }


        const urlEncode = new URLSearchParams(requiredF).toString();

        await fetch("https://bookslotsapi.onrender.com/auth/signup", {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: urlEncode,
        }).then((res) => {
            let data = res.json()

            data.then((obj) => {

                console.log(obj)
                const UserS = JSON.stringify(obj);
                localStorage.setItem('login-User', UserS);
                setUser(obj.User)
                setGoHome(true)

            })
        })




    }




    const validationSchema = Yup.object({
        firstName: Yup.string()
            .min(2, "First name must be at least 2 characters")
            .max(30, "First name must not exceed 30 characters")
            .required("First name is required"),

        lastName: Yup.string()
            .min(2, "Last name must be at least 2 characters")
            .max(30, "Last name must not exceed 30 characters")
            .required("Last name is required"),

        phone: Yup.string()
            .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
            .required("Phone number is required"),

        email: Yup.string()
            .email("Enter a valid email address")
            .required("Email is required"),

        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[0-9]/, "Password must contain at least one number")
            .required("Password is required"),

        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm password is required"),

        role: Yup.string()
            .oneOf(["mentor", "student"], "Please select a valid role")
            .required("Please select your role"),
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "",
        },

        validationSchema,

        onSubmit: (values, { resetForm }) => {
            SignupApi(values);

        },
    });

    // Reusable input class
    const inputClass = (field) =>
        `w-full px-4 py-3 rounded-lg border outline-none transition ${formik.touched[field] && formik.errors[field]
            ? "border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        }`;


    if (goHome) {

        return <Navigate to="/" />
    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 sm:p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Join our platform as a Mentor or Student
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-5">

                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        {/* First Name */}
                        <div>
                            <label
                                htmlFor="firstName"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                First Name
                            </label>

                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="Enter first name"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={inputClass("firstName")}
                            />

                            {formik.touched.firstName && formik.errors.firstName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.firstName}
                                </p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label
                                htmlFor="lastName"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Last Name
                            </label>

                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Enter last name"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={inputClass("lastName")}
                            />

                            {formik.touched.lastName && formik.errors.lastName && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.lastName}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Phone Number
                        </label>

                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            inputMode="numeric"
                            maxLength={10}
                            placeholder="Enter 10-digit phone number"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={inputClass("phone")}
                        />

                        {formik.touched.phone && formik.errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.phone}
                            </p>
                        )}
                    </div>

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
                            placeholder="Enter password"
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

                    {/* Confirm Password */}
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={inputClass("confirmPassword")}
                        />

                        {formik.touched.confirmPassword &&
                            formik.errors.confirmPassword && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.confirmPassword}
                                </p>
                            )}
                    </div>

                    {/* Role */}
                    <div>
                        <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Select Role
                        </label>

                        <select
                            id="role"
                            name="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={inputClass("role")}
                        >
                            <option value="">Select your role</option>
                            <option value="mentor">Mentor</option>
                            <option value="student">Student</option>
                        </select>

                        {formik.touched.role && formik.errors.role && (
                            <p className="text-red-500 text-sm mt-1">
                                {formik.errors.role}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700
                       text-white font-semibold py-3 rounded-lg
                       transition duration-200
                       focus:outline-none focus:ring-2
                       focus:ring-blue-300"
                    >
                        Create Account
                    </button>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link
                            to="../login"
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default Signup;