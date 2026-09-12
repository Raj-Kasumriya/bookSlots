import { useEffect, useState, } from "react";
import "./App.css";
import { useNavigate, Navigate } from 'react-router-dom';
import Loading from "./Loading";
//const bookedSlots = []
import ConfirmDelete from "./ConfirmDelete";

const StudentBookedSlots = ({ User }) => {


    const [loading, setLoading] = useState(true)

    const { role, _id } = User || {}


    if (!role) {
        return <Navigate to="/" />
    }


    const navigate = useNavigate()

    function handleReloadPage() {
        navigate(0)
    }

    const [bookedSlots, setBookSLots] = useState([])

    const [confirmDeleteBookingS, setConfirmDeleteBookingS] = useState({ status: false, index: 0 })


    useEffect(() => {

        fetch(`https://bookslotsapi.onrender.com/api/slots/booksSlots/student/${_id}`).then((res) => {
            let data = res.json()
            data.then((timeSlots) => {
                setBookSLots(timeSlots)
                setLoading(false)
            })
        }, [])


    }, [])

    async function handleCancelBookedSlot(ActivitySlotsId) {

        setLoading(true)

        await fetch(`https://bookslotsapi.onrender.com/api/slots/booksSlots/${_id}/${ActivitySlotsId}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            let data = res.json()
            data.then((status) => {


                setLoading(false)
                handleReloadPage(status)

            })
        })


    }

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            {loading && <Loading />}
            <div className="mx-auto max-w-5xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        My Booked Time Slots
                    </h1>

                    <p className="mt-2 text-gray-500">
                        View all your upcoming mentor sessions.
                    </p>
                </div>

                {confirmDeleteBookingS.status ?
                    <ConfirmDelete
                        howUse={'Delete Booking'}
                        setConfirmDelete={() => setConfirmDeleteBookingS({ status: false, index: 0 })}
                        handleDeleteSlot={() => handleCancelBookedSlot(bookedSlots[confirmDeleteBookingS.index].ActivitySlotsId)} /> : ''}

                {/* Booked Slots */}

                <div className="grid gap-5">
                    {bookedSlots.map((slot, index) => (
                        <div
                            key={slot._id}
                            className="rounded-xl bg-white p-5 shadow-md"
                        >


                            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                                {/* Mentor */}
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">
                                        {slot.mentorName}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {slot.heading}
                                    </p>
                                </div>

                                {/* Date & Time */}
                                <div className="text-sm text-gray-600">
                                    <p>
                                        <span className="font-semibold">Date:</span>{" "}
                                        {slot.date}
                                    </p>

                                    <p className="mt-1">
                                        <span className="font-semibold">Time:</span>{" "}
                                        {slot.startTime + " to " + slot.endTime}
                                    </p>
                                </div>

                                {/* Status */}
                                <div>
                                    <span
                                        className={`rounded-full px-4 py-2 text-sm font-medium bg-green-100 text-green-700 ${slot.studentBookingStatus === "cancel" ? "text-red-700 bg-red-100" : "cancel"}`}
                                    >
                                        {slot.studentBookingStatus}
                                    </span>
                                </div>

                                {/* Cancel Button */}
                                {slot.studentBookingStatus === "cancel" ? <button
                                    className="rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                                    onClick={() => handleCancelBookedSlot(slot.ActivitySlotsId)}
                                >
                                    ok
                                </button> : <button
                                    className="rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                                    onClick={() => setConfirmDeleteBookingS({ status: true, index: index })}
                                >
                                    cancel
                                </button>}

                            </div>


                        </div>
                    ))}
                </div>
                {/* Empty State */}
                {bookedSlots.length === 0 && (
                    <div className="rounded-xl bg-white p-10 text-center shadow-md">
                        <h2 className="text-xl font-semibold text-gray-700">
                            No Booked Time Slots
                        </h2>

                        <p className="mt-2 text-gray-500">
                            You have not booked any mentor sessions yet.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default StudentBookedSlots;

