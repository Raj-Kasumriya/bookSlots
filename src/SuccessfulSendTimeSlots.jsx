import { useNavigate, Link } from "react-router-dom";
import "./App.css";



export default function SuccessfulSendTimeSlots() {

    const navigate = useNavigate()

    function handleReloadPage() {
        navigate(0)
    }
    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="bg-white p-10 rounded-3xl shadow-2xl text-center ">


                <div className="w-6 h-6 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <svg
                        className="w-24 h-24 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h1 className="text-lg font-bold text-green-600 mb-6">
                    Successfuly send time slots
                </h1>

                <Link className=" text-white  text-center text-sm  bg-black py-2 px-4 mx-2 mt-4 rounded-4xl font-bold" to="/Home">Home</Link>
                <button onClick={handleReloadPage} className=" text-white  text-center text-sm  bg-black py-2 px-4 mx-2 mt-4 rounded-4xl font-bold">Create new</button>
            </div>
        </div>);
}

