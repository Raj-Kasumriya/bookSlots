import React, { useState } from "react";
import SuccessfulSendTimeSlots from "./SuccessfulSendTimeSlots";
import EditTimeSlots from "./EditSlots";

const ConfirmTimeSlots = ({ SessionData, setEdit }) => {


const [loading, setLoading] = useState(false)

    const [sessionData, setConfirmed] = useState(SessionData);

    const [successIcon, setSuccessIcon] = useState(false)

    const handleConfirm = async () => {

   setLoading(true)

        const jsonF = JSON.stringify(sessionData)

        await fetch("https://bookslotsapi.onrender.com/api/slots/", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonF,

        }).then((res) => {
            let data = res.json()
            data.then((status) => {

                console.log(status)

                if (status === "slots Successfully add") {
                    setLoading(false)
                    setSuccessIcon(true)

                }

            })
        })


    };

    const handleEdit = () => {
        setEdit(false)
    };



    if (successIcon) {

        return <SuccessfulSendTimeSlots />
    }




    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8" >
            
            {loading && <Loading />}
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Confirm Time Slots
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Please review your session details before confirming.
                    </p>
                </div>

                {/* Session Heading */}
                <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                    <p className="text-sm text-gray-500 mb-1">
                        Session Heading
                    </p>

                    <h2 className="text-xl font-bold text-gray-800">
                        {sessionData.heading}
                    </h2>
                </div>

                {/* Time Slots */}
                <div className="bg-white rounded-2xl shadow-sm p-6">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            Available Time Slots
                        </h2>

                        <span className="w-fit bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                            {sessionData.timeSlots.length} Slots
                        </span>
                    </div>

                    {/* Slots */}
                    <div className="space-y-4">
                        {sessionData.timeSlots.map((slot, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-xl p-5 bg-gray-50"
                            >
                                {/* Slot Header */}
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="font-semibold text-gray-800">
                                        Slot {index + 1}
                                    </h3>

                                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                                        {slot.day}
                                    </span>
                                </div>

                                {/* Slot Details */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                                    {/* Date */}
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Date
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-800">
                                            {slot.date}
                                        </p>
                                    </div>

                                    {/* Start Time */}
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Start Time
                                        </p>

                                        <p className="mt-1 font-semibold text-green-600">
                                            {slot.startTime}
                                        </p>
                                    </div>

                                    {/* End Time */}
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            End Time
                                        </p>

                                        <p className="mt-1 font-semibold text-red-600">
                                            {slot.endTime}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Success Message */}
                    {/* {confirmed && (
                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                            <p className="text-green-700 font-medium text-center">
                                ✓ Time slots confirmed successfully!
                            </p>
                        </div>
                    )} */}

                    {/* Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">

                        <button
                            type="button"
                            onClick={handleEdit}
                            className="w-full py-3 px-5 rounded-xl border
              border-gray-300 text-gray-700 font-semibold
              hover:bg-gray-100 transition disabled:opacity-50"
                        >
                            ← Edit Time Slots
                        </button>

                        <button
                            type="button"
                            onClick={handleConfirm}
                            className="w-full py-3 px-5 rounded-xl
              bg-green-600 text-white font-semibold
              hover:bg-green-700 transition disabled:opacity-50"
                        >
                            ✓ Confirm & Create
                        </button>

                    </div>
                </div>
            </div>
        </div >

    );
};

export default ConfirmTimeSlots;


