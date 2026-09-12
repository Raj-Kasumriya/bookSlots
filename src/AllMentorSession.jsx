import { Link, useNavigate, Navigate } from "react-router-dom";
import "./App.css"
import { useState, useEffect } from "react";
import EditTimeSlots from "./EditSlots";
import Loading from "./Loading";
import ConfirmDelete from "./ConfirmDelete";

const MentorSessions = ({ User }) => {




    const { role, _id } = User || {}

    if (!role) {
        return <Navigate to="/" />
    }

    const navigate = useNavigate()

    function handleReloadPage() {
        navigate(0)
    }

    const [loading, setLoading] = useState(true)
    const [sessions, setSessions] = useState([]);
    const [edit, setEdit] = useState({ edit: false, index: undefined })
    const [confirmDeleteSlot, setConfirmDeleteSlot] = useState({ status: false, slotId: undefined })

    useEffect(() => {

        fetch(`https://bookslotsapi.onrender.com/api/slots/${_id}`).then((res) => {
            let data = res.json()
            data.then((session) => {

                //console.log(session)
                setSessions(session.slots)
                setLoading(false)
            })
        })

    }, [])


    const handleDelete = async (id) => {

        setLoading(true)

        await fetch(`https://bookslotsapi.onrender.com/api/slots/${_id}/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            let data = res.json()
            data.then((status) => {

                handleReloadPage()
                setLoading(false)
            })
        })


    }
    if (edit.edit) {
        const EditSlots = sessions[edit.index]
        // console.log(EditSlots)

        return <EditTimeSlots initialValues={EditSlots} setEdit={setEdit} />
    }


    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            {loading && <Loading />}
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            My Sessions
                        </h1>

                        <p className="mt-2 text-gray-500">
                            View and manage all sessions you have created.
                        </p>
                    </div>

                    <Link to="/Mentor/createTimeSlots"

                        className="rounded-xl text-center bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                    >
                        + Create Session
                    </Link>
                </div>

                {/* Session Count */}
                <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Total Sessions
                    </p>

                    <p className="mt-1 text-3xl font-bold text-blue-600">
                        {sessions.length}
                    </p>
                </div>

                {confirmDeleteSlot.status ?
                    <ConfirmDelete
                        howUse={'Delete slot'}
                        setConfirmDelete={() => setConfirmDeleteSlot({ status: false, slotId: undefined })}
                        handleDeleteSlot={() => handleDelete(confirmDeleteSlot.slotId)} /> : ''}

                {/* Sessions */}
                {sessions.length > 0 ? (
                    <div className="grid gap-5 md:grid-cols-2">

                        {sessions.map((session, index) => (
                            <div
                                key={session._id}
                                className="rounded-2xl bg-white p-6 shadow-md"
                            >

                                {/* Session Header */}
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800">
                                            {session.heading}
                                        </h2>

                                    </div>

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                        Active
                                    </span>
                                </div>

                                {/* Session Details */}

                                {session.timeSlots.map((slot) => {
                                    return (
                                        <div key={slot._id} className="mt-5 space-y-3">

                                            <div className="flex justify-between rounded-lg bg-gray-50 p-3">
                                                <span className="text-sm text-gray-500">
                                                    {slot.startTime + " to " + slot.endTime}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {slot.day}
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    {slot.date}
                                                </span>
                                                <span className="font-medium text-gray-800">
                                                    {session.startTime}
                                                </span>
                                            </div>





                                        </div>

                                    )
                                })
                                }

                                {/* Actions */}
                                <div className="mt-6 flex gap-3">

                                    <button
                                        onClick={() => setEdit({ edit: true, index: index })}
                                        className="flex-1 rounded-lg border border-blue-600 px-4 py-2.5 font-medium text-blue-600 hover:bg-blue-50"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => setConfirmDeleteSlot({ status: true, slotId: session._id })}
                                        className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </button>

                                </div>
                            </div>
                        ))}

                    </div>
                ) : (
                    /* Empty State */
                    <div className="rounded-2xl bg-white p-10 text-center shadow-md">
                        <div className="text-5xl">📅</div>

                        <h2 className="mt-4 text-xl font-semibold text-gray-700">
                            No Sessions Created
                        </h2>

                        <p className="mt-2 text-gray-500">
                            You haven't created any mentor sessions yet.
                        </p>

                        <Link to="/Mentor/createTimeSlots"

                            className="mt-5 rounded-xl inline-block bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                        >
                            Create Your First Session
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MentorSessions;