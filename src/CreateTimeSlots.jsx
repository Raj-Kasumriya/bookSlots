
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ConfirmTimeSlots from "./ConfirmTimeSlots";
import { Navigate } from "react-router-dom";


const CreateTimeSlots = ({ User }) => {

    const { role, name, lastName, _id } = User || {}

    if (!role) {
        return <Navigate to="/" />
    }


    const [confirm, setConfirm] = useState([])
    const [edit, setEdit] = useState(false)

    const formatTime = (time) => {
        if (!time) return "";

        const [hours, minutes] = time.split(":");
        const date = new Date();

        date.setHours(hours, minutes);

        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };



    function createSessionApi(values) {

        const finalData = {
            heading: values.heading,
            mentorName: name + " " + lastName,
            mentorId: _id,
            timeSlots: values.timeSlots.map((slot) => ({
                startTime: formatTime(slot.startTime),
                endTime: formatTime(slot.endTime),
                day: slot.day,
                date: slot.date,
            })),
        };


        //console.log(finalData)
        setConfirm([finalData])
        setEdit(true)
    }




    const formik = useFormik({
        initialValues: {
            heading: "",
            timeSlots: [
                {
                    startTime: "",
                    endTime: "",
                    day: "",
                    date: "",
                },
            ],
        },

        validationSchema: Yup.object({
            heading: Yup.string()
                .required("Heading is required")
                .min(3, "Heading must be at least 3 characters"),

            timeSlots: Yup.array()
                .min(1, "At least one time slot is required")
                .of(
                    Yup.object({
                        startTime: Yup.string().required(
                            "Start time is required"
                        ),

                        endTime: Yup.string()
                            .required("End time is required")
                            .test(
                                "end-after-start",
                                "End time must be after start time",
                                function (value) {
                                    const { startTime } = this.parent;

                                    if (!startTime || !value) return true;

                                    return value > startTime;
                                }
                            ),

                        date: Yup.string().required("Date is required"),

                        day: Yup.string().required("Day is required"),
                    })
                ),
        }),

        onSubmit: (values) => {
            createSessionApi(values)
        },
    });

    // Add another slot
    const addTimeSlot = () => {
        formik.setFieldValue("timeSlots", [
            ...formik.values.timeSlots,
            {
                startTime: "",
                endTime: "",
                day: "",
                date: "",
            },
        ]);
    };

    // Remove slot
    const removeTimeSlot = (index) => {
        if (formik.values.timeSlots.length === 1) return;

        const updatedSlots = [...formik.values.timeSlots];

        updatedSlots.splice(index, 1);

        formik.setFieldValue("timeSlots", updatedSlots);
    };

    // Date → Day
    const handleDateChange = (index, value) => {
        if (!value) return;

        const selectedDate = new Date(`${value}T00:00:00`);

        const day = selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
        });

        formik.setFieldValue(
            `timeSlots[${index}].date`,
            value
        );

        formik.setFieldValue(
            `timeSlots[${index}].day`,
            day
        );
    };



    if (edit) {

        return <ConfirmTimeSlots SessionData={confirm[0]} setEdit={setEdit} />
    }




    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="mx-auto max-w-3xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Session
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Add one session heading and multiple time slots.
                    </p>
                </div>

                <form
                    onSubmit={formik.handleSubmit}
                    className="space-y-6"
                >

                    {/* ================= HEADING ================= */}
                    <div className="rounded-2xl bg-white p-6 shadow-md">

                        <label
                            htmlFor="heading"
                            className="mb-2 block font-semibold text-gray-700"
                        >
                            Session Heading
                        </label>

                        <input
                            id="heading"
                            name="heading"
                            type="text"
                            placeholder="Example: React JS"
                            value={formik.values.heading}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />

                        {formik.touched.heading &&
                            formik.errors.heading && (
                                <p className="mt-2 text-sm text-red-500">
                                    {formik.errors.heading}
                                </p>
                            )}

                    </div>

                    {/* ================= TIME SLOTS ================= */}
                    <div className="space-y-5">

                        {formik.values.timeSlots.map((slot, index) => (
                            <div
                                key={index}
                                className="rounded-2xl bg-white p-6 shadow-md"
                            >

                                {/* Slot Header */}
                                <div className="mb-5 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Time Slot {index + 1}
                                    </h2>

                                    {formik.values.timeSlots.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeTimeSlot(index)}
                                            className="text-sm font-semibold text-red-600 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                                {/* Date & Day */}
                                <div className="grid gap-4 md:grid-cols-2">

                                    {/* Date */}
                                    <div>
                                        <label className="mb-2 block font-medium text-gray-700">
                                            Date
                                        </label>

                                        <input
                                            type="date"
                                            min={new Date()
                                                .toISOString()
                                                .split("T")[0]}
                                            value={slot.date}
                                            onChange={(e) =>
                                                handleDateChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            onBlur={() =>
                                                formik.setFieldTouched(
                                                    `timeSlots[${index}].date`,
                                                    true
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        />

                                        {formik.touched.timeSlots?.[index]?.date &&
                                            formik.errors.timeSlots?.[index]?.date && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {formik.errors.timeSlots[index].date}
                                                </p>
                                            )}
                                    </div>

                                    {/* Day */}
                                    <div>
                                        <label className="mb-2 block font-medium text-gray-700">
                                            Day
                                        </label>

                                        <input
                                            type="text"
                                            value={slot.day}
                                            readOnly
                                            placeholder="Auto selected"
                                            className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-600 outline-none"
                                        />
                                    </div>

                                </div>

                                {/* Start & End Time */}
                                <div className="mt-4 grid gap-4 md:grid-cols-2">

                                    {/* Start Time */}
                                    <div>
                                        <label className="mb-2 block font-medium text-gray-700">
                                            Start Time
                                        </label>

                                        <input
                                            type="time"
                                            name={`timeSlots[${index}].startTime`}
                                            value={slot.startTime}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        />

                                        {formik.touched.timeSlots?.[index]
                                            ?.startTime &&
                                            formik.errors.timeSlots?.[index]
                                                ?.startTime && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {
                                                        formik.errors.timeSlots[index]
                                                            .startTime
                                                    }
                                                </p>
                                            )}
                                    </div>

                                    {/* End Time */}
                                    <div>
                                        <label className="mb-2 block font-medium text-gray-700">
                                            End Time
                                        </label>

                                        <input
                                            type="time"
                                            name={`timeSlots[${index}].endTime`}
                                            value={slot.endTime}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        />

                                        {formik.touched.timeSlots?.[index]
                                            ?.endTime &&
                                            formik.errors.timeSlots?.[index]
                                                ?.endTime && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {
                                                        formik.errors.timeSlots[index]
                                                            .endTime
                                                    }
                                                </p>
                                            )}
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Add Slot */}
                    <button
                        type="button"
                        onClick={addTimeSlot}
                        className="w-full rounded-xl border-2 border-dashed border-blue-400 bg-blue-50 py-3 font-semibold text-blue-600 transition hover:bg-blue-100"
                    >
                        + Add Another Time Slot
                    </button>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                    >
                        Create Session
                    </button>

                </form>
            </div>
        </div>
    );
};

export default CreateTimeSlots;

