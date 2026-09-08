import "./App.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    // Yup Validation Schema
    const validationSchema = Yup.object({
        emailOrPhone: Yup.string()
            .required("Email or phone number is required")
            .test(
                "email-or-phone",
                "Enter a valid email or 10-digit phone number",
                (value) => {
                    if (!value) return false;

                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const phoneRegex = /^[6-9]\d{9}$/;

                    return emailRegex.test(value) || phoneRegex.test(value);
                }
            ),
    });

    const formik = useFormik({
        initialValues: {
            emailOrPhone: "",
        },

        validationSchema,

        onSubmit: (values) => {
            console.log("Forgot Password Data:", values);

            alert("OTP has been sent to your email or phone number.");
        },
    });

    const inputClass = `
    w-full px-4 py-3
    rounded-lg border
    outline-none transition
    ${formik.touched.emailOrPhone && formik.errors.emailOrPhone
            ? "border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        }
  `;

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">

                {/* Header */}
                <div className="text-center mb-8">

                    {/* Lock Icon */}
                    <div className="w-16 h-16 mx-auto mb-4
                          bg-blue-100 text-blue-600
                          rounded-full flex items-center justify-center">

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.5 10.5V6.75a4.5 4.5 0 00-9 0v3.75m-.75 0h10.5A1.5 1.5 0 0118.75 12v7.5a1.5 1.5 0 01-1.5 1.5h-10.5a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5z"
                            />
                        </svg>

                    </div>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Forgot Password?
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Enter your email or phone number to reset your password.
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={formik.handleSubmit}
                    className="space-y-5"
                >

                    {/* Email / Phone */}
                    <div>
                        <label
                            htmlFor="emailOrPhone"
                            className="block text-sm font-medium
                         text-gray-700 mb-2"
                        >
                            Email or Phone Number
                        </label>

                        <input
                            id="emailOrPhone"
                            name="emailOrPhone"
                            type="text"
                            placeholder="Email or 10-digit phone number"
                            value={formik.values.emailOrPhone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={inputClass}
                        />

                        {formik.touched.emailOrPhone &&
                            formik.errors.emailOrPhone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formik.errors.emailOrPhone}
                                </p>
                            )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600
                       hover:bg-blue-700
                       text-white font-semibold
                       py-3 rounded-lg
                       transition duration-200
                       focus:outline-none
                       focus:ring-2
                       focus:ring-blue-300"
                    >
                        Send OTP
                    </button>

                    {/* Back to Login */}
                    <div className="text-center">
                        <Link
                            to="../login"
                            className="text-sm text-blue-600
                         hover:text-blue-700 font-medium"
                        >
                            ← Back to Login
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;