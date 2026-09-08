import "./App.css"
import { useEffect, useState } from "react";

const StudentSubTimeSlots = ({ User }) => {


    const { _id } = User || {}

    const [submittedTimeSlots, setSubmittedTimeSlots] = useState([])

    useEffect(() => {

        fetch(`https://bookslotsapi.onrender.com/api/slots/mentor/${_id}`).then((res) => {
            let data = res.json()
            data.then((timeSlots) => {
                console.log(timeSlots)
                setSubmittedTimeSlots(timeSlots)


            })
        }, [])


    }, [])





    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
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
                            key={slot.id}
                            className="rounded-xl bg-white p-5 shadow-md"
                        >
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
                                <span className="w-fit rounded-full px-4 py-2 text-sm font-medium bg-green-100 text-green-700" >
                                    submitted
                                </span>

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
