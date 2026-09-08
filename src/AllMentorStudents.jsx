import "./App.css";

const students = [
    {
        id: 1,
        name: "Raj Kumar",
        email: "raj@gmail.com",
        phone: "9876543210",
        course: "Web Development",
        status: "Active",
    },
    {
        id: 2,
        name: "Aman Sharma",
        email: "aman@gmail.com",
        phone: "9876543211",
        course: "React JS",
        status: "Active",
    },
    {
        id: 3,
        name: "Priya Verma",
        email: "priya@gmail.com",
        phone: "9876543212",
        course: "Java Programming",
        status: "Active",
    },
    {
        id: 4,
        name: "Rohit Patel",
        email: "rohit@gmail.com",
        phone: "9876543213",
        course: "JavaScript",
        status: "Inactive",
    },
];

const MentorStudents = () => {


    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        My Students
                    </h1>

                    <p className="mt-2 text-gray-500">
                        View all students connected with you.
                    </p>
                </div>

                {/* Student Count */}
                <div className="mb-6 rounded-xl bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Total Students
                    </p>

                    <p className="mt-1 text-3xl font-bold text-blue-600">
                        {students.length}
                    </p>
                </div>

                {/* Desktop Table */}
                <div className="hidden overflow-hidden rounded-xl bg-white shadow-md md:block">
                    <div className="overflow-x-auto">
                        <table className="w-full">

                            <thead className="bg-gray-50">
                                <tr className="text-left text-sm text-gray-600">
                                    <th className="px-6 py-4">Student</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Phone</th>
                                    <th className="px-6 py-4">Course</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {students.map((student) => (
                                    <tr
                                        key={student.id}
                                        className="hover:bg-gray-50"
                                    >
                                        {/* Student */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                                    {student.name
                                                        .split(" ")
                                                        .map((word) => word[0])
                                                        .join("")}
                                                </div>

                                                <span className="font-medium text-gray-800">
                                                    {student.name}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td className="px-6 py-4 text-gray-600">
                                            {student.email}
                                        </td>

                                        {/* Phone */}
                                        <td className="px-6 py-4 text-gray-600">
                                            {student.phone}
                                        </td>

                                        {/* Course */}
                                        <td className="px-6 py-4 text-gray-600">
                                            {student.course}
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${student.status === "Active"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-600"
                                                    }`}
                                            >
                                                {student.status}
                                            </span>
                                        </td>

                                        {/* Action */}
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() =>
                                                    alert(`View ${student.name}`)
                                                }
                                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="grid gap-4 md:hidden">
                    {students.map((student) => (
                        <div
                            key={student.id}
                            className="rounded-xl bg-white p-5 shadow-md"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600">
                                    {student.name
                                        .split(" ")
                                        .map((word) => word[0])
                                        .join("")}
                                </div>

                                <div>
                                    <h2 className="font-semibold text-gray-800">
                                        {student.name}
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        {student.course}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 space-y-2 text-sm text-gray-600">
                                <p>
                                    <strong>Email:</strong> {student.email}
                                </p>

                                <p>
                                    <strong>Phone:</strong> {student.phone}
                                </p>

                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span
                                        className={
                                            student.status === "Active"
                                                ? "font-medium text-green-600"
                                                : "font-medium text-gray-500"
                                        }
                                    >
                                        {student.status}
                                    </span>
                                </p>
                            </div>

                            <button
                                onClick={() => alert(`View ${student.name}`)}
                                className="mt-4 w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white hover:bg-blue-700"
                            >
                                View Student
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default MentorStudents;