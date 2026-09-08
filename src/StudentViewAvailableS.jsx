import "./App.css"
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import AnimatedMessageBar from "./BookedSlotConfirm";
import Loading from "./Loading";
import { Navigate } from "react-router-dom";


const TimeSlotSelection = ({ User }) => {



    const { role, name, lastName, _id } = User || {}

    if (!role) {
        return <Navigate to="../" />
    }

    const [loading, setLoading] = useState(true)
    const [timeSlots, setTimeSlots] = useState([])
    const [slotBooked, setSlotBooked] = useState("")



    async function confirmSlot({ timeSlot }) {

        //  console.log(timeSlot)

        setLoading(true)

        const bookSlotId = timeSlot._id

        delete timeSlot._id

        const finalObj = {
            bookSlotId,
            ...timeSlot
        }


        const jsonF = JSON.stringify(finalObj)

        await fetch("https://bookslotsapi.onrender.com/api/slots/booksSlots", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonF,

        }).then((res) => {
            let data = res.json()
            data.then((status) => {



                if (status.massage === "slot all ready booked") {
                    setLoading(false)
                    setSlotBooked("allReadyBooked")

                }

                if (status.massage === "you booked slot all ready for this session") {
                    setLoading(false)
                    setSlotBooked("youBookedSession")

                }
                if (status.massage === "slots book successfully add") {
                    setLoading(false)
                    setSlotBooked("success")
                }
            })
        })



    }

    useEffect(() => {

        fetch(`https://bookslotsapi.onrender.com/api/slots/${_id}`).then((res) => {
            let data = res.json()
            data.then((timeSlots) => {
                console.log(timeSlots)
                setTimeSlots(timeSlots.slots)
                setLoading(false)
            })
        })


    }, [])



    const formik = useFormik({

        initialValues: {
            timeSlot: "",
        },

        validationSchema: Yup.object({

            timeSlot: Yup.object()
                .required("Please select a time slot"),
        }),

        onSubmit: (values, { resetForm }) => {

            confirmSlot(values);

            resetForm();
        },
    });


    return (
        <>  {slotBooked && <AnimatedMessageBar condition={slotBooked} setSlotBooked={setSlotBooked} />}
            <div className="min-h-screen bg-gray-100 px-4 py-10">


                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Select Your Time Slot
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Choose a convenient date and time for your mentor session.
                    </p>
                </div>
                {loading && <Loading />}

                {/* Header */}


                {/* Mentor Card */}
                {/* <div className="mb-6 rounded-2xl bg-white p-6 shadow-md">
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-600">
                            AK
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Amit Kumar
                            </h2>

                            <p className="text-sm text-gray-500">
                                Full Stack Developer Mentor
                            </p>

                            <p className="mt-1 text-sm text-green-600">
                                ● Available for mentoring
                            </p>
                        </div>
                    </div>
                </div> */}

                {
                    timeSlots.length !== 0 ? timeSlots.map((slots, index) => {

                        return (

                            <div key={index} className="mx-auto max-w-3xl my-8">

                                <form
                                    onSubmit={formik.handleSubmit}
                                    className="rounded-2xl bg-white p-6 shadow-md"
                                >
                                    <h1 className="text-center bg-slate-100 text-xl font-bold p-1 rounded-lg mb-4">{slots.heading}</h1>
                                    {/* Time Slots */}
                                    <div className="mb-6">
                                        <label className="mb-3 block font-medium text-gray-700">
                                            Select Time Slot
                                        </label>

                                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            {slots.timeSlots.map((slot, index) => {
                                                const selected = (formik.values.timeSlot["_id"] === slot["_id"]);

                                                return (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() =>
                                                            formik.setFieldValue("timeSlot", {
                                                                ...slot,
                                                                mentorId: slots.mentorId,
                                                                mentorName: slots.mentorName,
                                                                ActivitySlotsId: slots._id,
                                                                studentId: _id,
                                                                studentName: name + " " + lastName,
                                                                heading: slots.heading
                                                            })
                                                        }
                                                        className={`rounded-xl border p-4 text-left font-medium transition-all
                      ${selected
                                                                ? "border-blue-600 bg-blue-600 text-white shadow-md"
                                                                : "border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:bg-blue-50"
                                                            }`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div> <span>{slot.startTime}</span>
                                                                <span> to </span> <span>{slot.endTime}</span></div>
                                                            <span>{slot.day}</span>
                                                            <span>{slot.date}</span>

                                                            {selected && (
                                                                <span className="text-lg">✓</span>
                                                            )}
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {formik.touched.timeSlot && formik.errors.timeSlot && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {formik.errors.timeSlot}
                                            </p>
                                        )}
                                    </div>



                                    {/* Selected Information */}
                                    {formik.values.timeSlot && (
                                        <div className="mb-6 rounded-xl bg-blue-50 p-4">
                                            <h3 className="mb-2 font-semibold text-blue-800">
                                                Selected Session
                                            </h3>

                                            <p className="text-sm text-blue-700">
                                                <strong>Date:</strong> {formik.values.timeSlot.date}
                                            </p>
                                            <p className="text-sm text-blue-700">
                                                <strong>Day:</strong> {formik.values.timeSlot.day}
                                            </p>
                                            <p className="text-sm text-blue-700">
                                                <strong>time:</strong>  {formik.values.timeSlot.startTime} to {formik.values.timeSlot.endTime}
                                            </p>

                                        </div>
                                    )}

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                                    >
                                        Confirm Time Slot
                                    </button>
                                </form>
                            </div>
                        )
                    })
                        : ""}

            </div>
        </>
    );
};

export default TimeSlotSelection;