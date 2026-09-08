import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { useState } from "react";

const convertTo12Hour = (time) => {
    if (!time) return "";

    const [hour, minute] = time.split(":");
    let h = parseInt(hour, 10);

    const ampm = h >= 12 ? "PM" : "AM";

    h = h % 12;
    h = h === 0 ? 12 : h;

    return `${String(h).padStart(2, "0")}:${minute} ${ampm}`;
};

// Get day from date
const getDay = (date) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
        "en-US",
        {
            weekday: "long",
        }
    );
};

const validationSchema = Yup.object({
    heading: Yup.string()
        .trim()
        .required("Heading is required"),

    timeSlots: Yup.array()
        .min(1, "At least one slot is required")
        .of(
            Yup.object({
                startTime: Yup.string().required(
                    "Start time is required"
                ),

                endTime: Yup.string()
                    .required("End time is required")
                    .test(
                        "valid-time",
                        "End time must be greater than start time",
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
});

const convertTo24Hour = (time) => {
    if (!time) return "";

    const [timePart, ampm] = time.trim().split(" ");
    let [hour, minute] = timePart.split(":");

    let h = parseInt(hour, 10);

    if (ampm.toUpperCase() === "AM") {
        if (h === 12) h = 0;
    } else if (ampm.toUpperCase() === "PM") {
        if (h !== 12) h += 12;
    }

    return `${String(h).padStart(2, "0")}:${minute}`;
};

function EditTimeSlots({ initialValues, setEdit }) {


    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    function handleReloadPage() {
        navigate(0)
    }

    async function editApi(value) {

        setLoading(true)
        const jsonF = JSON.stringify(value)

        await fetch(`https://bookslotsapi.onrender.com/api/slots/${initialValues._id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonF
        }).then((res) => {
            let data = res.json()
            data.then((status) => {

                handleReloadPage()
                setLoading(false)
            })
        })

    }




    const initialValuesEdit = {

        heading: initialValues.heading,
        timeSlots: initialValues.timeSlots.map((slot) => {
            return (
                {
                    startTime: convertTo24Hour(slot.startTime),
                    endTime: convertTo24Hour(slot.endTime),
                    date: slot.date,
                    day: slot.day,
                }
            )
        })
    }




    const formik = useFormik({
        initialValues: initialValuesEdit,
        validationSchema,

        onSubmit: (values) => {
            const data = {
                heading: values.heading,

                timeSlots: values.timeSlots.map((slot) => ({
                    startTime: convertTo12Hour(slot.startTime),
                    endTime: convertTo12Hour(slot.endTime),
                    day: slot.day,
                    date: slot.date,
                })),
            };

            editApi(data)
        },
    });

    // Add new slot
    const addSlot = () => {
        formik.setFieldValue("timeSlots", [
            ...formik.values.timeSlots,
            {
                startTime: "",
                endTime: "",
                date: "",
                day: "",
            },
        ]);
    };

    // Delete slot
    const deleteSlot = (index) => {
        const slots = [...formik.values.timeSlots];

        slots.splice(index, 1);

        formik.setFieldValue("timeSlots", slots);
    };

    // Update slot
    const updateSlot = (index, field, value) => {
        const slots = [...formik.values.timeSlots];

        slots[index] = {
            ...slots[index],
            [field]: value,
        };

        // Automatically update day
        if (field === "date") {
            slots[index].day = getDay(value);
        }

        formik.setFieldValue("timeSlots", slots);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            {loading && <Loading />}
            <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-lg">

                <h1 className="mb-6 text-2xl font-bold text-gray-800">
                    Edit Time Slots
                </h1>

                <form onSubmit={formik.handleSubmit}>

                    {/* Heading */}
                    <div className="mb-6">

                        <label className="mb-2 block font-medium text-gray-700">
                            Heading
                        </label>

                        <input
                            type="text"
                            name="heading"
                            value={formik.values.heading}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter heading"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                        {formik.touched.heading &&
                            formik.errors.heading && (
                                <p className="mt-1 text-sm text-red-500">
                                    {formik.errors.heading}
                                </p>
                            )}

                    </div>

                    {/* Slots */}
                    <div>

                        <div className="mb-4 flex items-center justify-between">

                            <h2 className="text-xl font-semibold text-gray-800">
                                Time Slots
                            </h2>

                            <button
                                type="button"
                                onClick={addSlot}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                            >
                                + Add Slot
                            </button>

                        </div>

                        {formik.values.timeSlots.map((slot, index) => {

                            const slotError =
                                formik.errors.timeSlots &&
                                    Array.isArray(formik.errors.timeSlots)
                                    ? formik.errors.timeSlots[index]
                                    : null;

                            return (
                                <div
                                    key={index}
                                    className="mb-5 rounded-xl border border-gray-200 bg-gray-50 p-5"
                                >

                                    {/* Slot heading */}
                                    <div className="mb-4 flex items-center justify-between">

                                        <h3 className="font-semibold text-gray-700">
                                            Slot {index + 1}
                                        </h3>

                                        {formik.values.timeSlots.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => deleteSlot(index)}
                                                className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        )}

                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">

                                        {/* Date */}
                                        <div>

                                            <label className="mb-2 block font-medium text-gray-700">
                                                Date
                                            </label>

                                            <input
                                                type="date"
                                                value={slot.date}
                                                onChange={(e) =>
                                                    updateSlot(
                                                        index,
                                                        "date",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                                            />

                                            {slotError?.date && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {slotError.date}
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
                                                className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3"
                                            />

                                        </div>

                                        {/* Start */}
                                        <div>

                                            <label className="mb-2 block font-medium text-gray-700">
                                                Start Time
                                            </label>

                                            <input
                                                type="time"
                                                value={slot.startTime}
                                                onChange={(e) =>
                                                    updateSlot(
                                                        index,
                                                        "startTime",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                                            />

                                            {slotError?.startTime && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {slotError.startTime}
                                                </p>
                                            )}

                                        </div>

                                        {/* End */}
                                        <div>

                                            <label className="mb-2 block font-medium text-gray-700">
                                                End Time
                                            </label>

                                            <input
                                                type="time"
                                                value={slot.endTime}
                                                onChange={(e) =>
                                                    updateSlot(
                                                        index,
                                                        "endTime",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                                            />

                                            {slotError?.endTime && (
                                                <p className="mt-1 text-sm text-red-500">
                                                    {slotError.endTime}
                                                </p>
                                            )}

                                        </div>

                                    </div>

                                    {/* Preview */}
                                    {slot.startTime &&
                                        slot.endTime &&
                                        slot.date && (
                                            <div className="mt-4 rounded-lg bg-white p-3 text-sm">

                                                <span className="font-semibold">
                                                    Preview:
                                                </span>{" "}

                                                {convertTo12Hour(slot.startTime)}
                                                {" - "}
                                                {convertTo12Hour(slot.endTime)}

                                                {" | "}

                                                {slot.day}

                                                {" | "}

                                                {slot.date}

                                            </div>
                                        )}

                                </div>
                            );
                        })}

                    </div>

                    {/* Buttons */}
                    <div className="mt-6 flex gap-3">

                        <button
                            type="button"
                            onClick={() => setEdit({ edit: false, index: undefined })}
                            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditTimeSlots;