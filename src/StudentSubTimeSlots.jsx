import "./App.css"
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Navigate, useNavigate } from "react-router-dom";


const StudentSubTimeSlots = ({ User }) => {

    const [loading, setLoading] = useState(true)

    const { role, _id } = User || {}

    if (!role) {
        return <Navigate to="/" />
    }

    const navigate = useNavigate()

    function handleReloadPage() {
        navigate(0)
    }

    const [submittedTimeSlots, setSubmittedTimeSlots] = useState([])

    useEffect(() => {

        fetch(`https://bookslotsapi.onrender.com/api/slots/booksSlots/mentor/${_id}`).then((res) => {
            let data = res.json()
            data.then((timeSlots) => {
                console.log(timeSlots)
                setSubmittedTimeSlots(timeSlots)
                setLoading(false)
            })
        })

    }, [])

    async function handleConfirmTimeSlotAndCancel(id, status) {

        setLoading(true)

        const updateStatus = { studentBookingStatus: status }

        const jsonF = JSON.stringify(updateStatus)

        await fetch(`https://bookslotsapi.onrender.com/api/slots/booksSlots/mentor/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonF
        }).then((res) => {
            let data = res.json()
            data.then((status) => {

                console.log(status)
                setLoading(false)
                handleReloadPage()
                // setLoading(false)
            })
        })

    }








    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">

            {loading && <Loading />}

            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Submitted Time Slots
                    </h1>

                    <p className="mt-2 text-gray-500">
                        View students who submitted their mentor session time slots.
                    </p>
                </div>

                {/* Time Slots */}
                <div className="grid gap-4">

                    {submittedTimeSlots.map((slot) => (
                        <div
                            key={slot._id}
                            className="rounded-xl bg-white p-5 shadow-md"
                        >
                            <h1 className="text-xl font-bold text-center mb-4 ">{slot.heading}</h1>

                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                                {/* Student */}
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        {slot.studentName}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {slot.heading}
                                    </p>
                                </div>

                                {/* Date */}
                                <div>
                                    <p className="text-xs text-gray-400">
                                        DATE
                                    </p>

                                    <p className="font-medium text-gray-700">
                                        {slot.date}
                                    </p>
                                </div>

                                {/* Time Slot */}
                                <div>
                                    <p className="text-xs text-gray-400">
                                        TIME SLOT
                                    </p>

                                    <p className="font-medium text-gray-700">
                                        {slot.startTime} - {slot.endTime}
                                    </p>
                                </div>

                                {/* Status */}
                                <div className="flex justify-between  ">

                                    <div className="flex flex-col">
                                        <p className="text-xs text-gray-400">
                                            Status
                                        </p>

                                        <span className={`text-blue-500 font-bold text-lg ${slot.studentBookingStatus === "confirm" && "text-green-500"}`} >
                                            {slot.studentBookingStatus}
                                        </span>

                                    </div>
                                    <div>
                                        <button onClick={() => handleConfirmTimeSlotAndCancel(slot._id, "cancel")} className="bg-red-600  text-white px-4 py-2 m-3  rounded-4xl">cancel</button>
                                        {slot.studentBookingStatus === "waiting" ? < button onClick={() => handleConfirmTimeSlotAndCancel(slot._id, "confirm")} className="bg-green-600  text-white px-4 py-2 m-3  rounded-4xl">confirm</button> : ""}
                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty */}
                {submittedTimeSlots.length === 0 && (
                    <div className="rounded-xl bg-white p-10 text-center shadow">
                        <h2 className="text-xl font-semibold text-gray-700">
                            No Submitted Time Slots
                        </h2>

                        <p className="mt-2 text-gray-500">
                            No students have submitted a time slot yet.
                        </p>
                    </div>
                )}

            </div>
        </div >
    );
};

export default StudentSubTimeSlots;
