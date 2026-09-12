import "./App.css"
import { useEffect, useState } from "react";
import Loading from "./Loading";
import { Navigate } from "react-router-dom";

const StudentSubTimeSlots = ({ User }) => {

    const [loading, setLoading] = useState(true)

    const { role, _id } = User || {}

    if (!role) {
        return <Navigate to="/" />
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

    async function handleConfirmTimeSlot(id) {

        const updateStatus = { studentBookingStatus: "confirm" }

        const jsonF = JSON.stringify(updateStatus)

        await fetch(`http://localhost:8000/api/slots/booksSlots/mentor/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonF
        }).then((res) => {
            let data = res.json()
            data.then((status) => {

                console.log(status)

                // setLoading(false)
            })
        })

    }

    async function handleCancelTimeSlot(studentId, ActivitySlotsId) {

        console.log(studentId, ActivitySlotsId)

        setLoading(true)

        await fetch(`https://bookslotsapi.onrender.com/api/slots/booksSlots/${studentId}/${ActivitySlotsId}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },

        }).then((res) => {
            let data = res.json()
            data.then((status) => {
                setLoading(false)
                console.log(status)

            })
        })

        console.log("cancel")

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
                                <div className="flex justify-between ">
                                    <span className="w-fit rounded-full px-4 py-2 text-sm font-medium bg-green-100 text-green-700" >
                                        {slot.studentBookingStatus}
                                    </span>
                                    <div>
                                        <button onClick={() => handleCancelTimeSlot(slot._id)} className="bg-red-600  text-white px-4 py-2 mx-3  rounded-4xl">cancel</button>
                                        {slot.studentBookingStatus === "waiting" ? < button onClick={() => handleConfirmTimeSlot(slot.studentId, slot.ActivitySlotsId)} className="bg-green-600  text-white px-4 py-2 mx-3  rounded-4xl">confirm</button> : ""}
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
