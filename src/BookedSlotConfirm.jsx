import React, { useEffect, useState } from "react";

const AnimatedMessageBar = ({ condition, setSlotBooked }) => {
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(false)
            setSlotBooked("");

        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    if (!showMessage) return null;

    return (
        <div className="fixed  top-2 left-1/2 z-50 -translate-x-1/2 bg-white rounded-lg">
            <div className={"flex min-w-[320px] font-bold items-center justify-between gap-4 rounded-lg  px-5 py-3  shadow-lg "}>

                {condition === "success" ? <div className="flex items-center gap-3">
                    <span className="text-xl">✅</span>

                    <div>
                        <p className="font-semibold">Success!</p>
                        <p className="text-sm">
                            Your time slot  booking send successfully.
                        </p>
                    </div>
                </div> : ""}

                {condition === "allReadyBooked" ? <div className="flex items-center gap-3">
                    <span className="text-xl">❌</span>

                    <div>
                        <p className="font-semibold">All Ready Booked!</p>
                        <p className="text-sm">
                            You select time slot has been  all ready booked
                        </p>
                    </div>
                </div> : ""}
                {condition === "youBookedSession" ?
                    <div className="flex items-center gap-3">
                        <span className="text-xl">❌</span>

                        <div>
                            <p className="font-semibold">Session Booked!</p>
                            <p className="text-sm">
                                You Already participate this  session.
                            </p>
                        </div>
                    </div> : ""}

                {condition === "loginFailed" ?
                    <div className="flex items-center gap-3">
                        <span className="text-xl">❌</span>

                        <div>
                            <p className="font-semibold">Login Failed!</p>
                            <p className="text-sm">
                                Authentication failed. Email or password is incorrect.
                            </p>
                        </div>
                    </div> : ""}

                {condition === "signupFailed" ?
                    <div className="flex items-center gap-3">
                        <span className="text-xl">❌</span>

                        <div>
                            <p className="font-semibold">Signup Failed!</p>
                            <p className="text-sm">
                                signup failed. sever is not response or Bad request
                            </p>
                        </div>
                    </div> : ""}





                <button
                    onClick={() => setShowMessage(false)}
                    className="text-xl font-bold hover:text-gray-200"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default AnimatedMessageBar;