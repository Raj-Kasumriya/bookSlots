import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { userContexts } from "./App";
import { RxCross2 } from "react-icons/rx";

const AnimatedSidebar = () => {

    const { UserC, setUser } = useContext(userContexts)

    const { role, name, lastName } = UserC || {}

    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                isOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen]);

    function handleLogoutUser() {
        localStorage.removeItem('login-User')
        setUser({})
    }

    return (
        <div >
            {/* Open Sidebar Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={` rotate-90 rounded-xl  text-white   hover:scale-150  ${isOpen
                    ? "pointer-events-none scale-0 opacity-0"
                    : "scale-125 opacity-100"
                    }`}
            >
                |||
            </button>

            {/* Background Overlay */}
            <div
                onClick={() => setIsOpen(false)}
                className={` inset-0  bg-black/40 backdrop-blur-[2px] transition-all duration-500 ${isOpen
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                    }`}
            />

            {/* Sidebar */}
            <aside
                ref={sidebarRef}
                className={` fixed left-0 top-0  flex  rounded-sm flex-col text-black  shadow-2xl bg-white
        transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0 translate-y-0 " : "-translate-x-full "}`}
            >
                {/* Header */}
                <div className="flex h-16 items-center gap-2 justify-between border-b px-5">
                    <div className="flex items-center gap-3">

                        {(role === "student" || role === "mentor") ? <div className="flex  text-white p-2 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold ">
                            {name[0].toUpperCase()}{lastName[0].toUpperCase()}
                        </div> : " "}


                        <div>
                            <h1 className="text-lg font-bold text-gray-800">
                                BookSlots
                            </h1>
                            <p className="text-xs text-green-500">
                                {role}
                            </p>
                        </div>

                    </div>

                    {/* Close Button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-lg p-2 text-gray-500 transition-all duration-300 hover:rotate-90 hover:bg-gray-100 hover:text-red-500"
                    >
                        <RxCross2 />
                    </button>
                </div>

                {/* Menu */}

                <div className="flex flex-col  p-6 font-bold text-lg">


                    {/* <Link to="/" >Home</Link> */}
                    {(role === "student" || role === "mentor") ? <div className="flex flex-col" ><Link to="About-as" >About Me</Link></div> :
                        <div className="flex flex-col">
                            <Link to="/" >Home</Link>
                            <Link to="About-as" >About Me</Link>

                        </div>}


                    {

                        role === "mentor" ?
                            <div className=" flex flex-col">
                                {/* <Link to="../Mentor/DashBoard" >Dashboard</Link> */}
                                <Link to="../Mentor/createTimeSlots" >Create session</Link>
                                <Link to="../Mentor/MentorSessions" >Sessions</Link>
                                <Link to="../Mentor/timeSlotsSubmittedStudent" >Submission</Link>
                                {/* <Link to="../Mentor/Students" >Student</Link> */}

                            </div> : ""
                    }

                    {

                        role === "student" ?
                            <div className=" flex flex-col">
                                <Link to="../Student/viewSession" >View session </Link>
                                <Link to="../Student/viewBookedSession" >Booked session </Link>

                            </div> : ""}


                </div>



                {/* Logout */}
                < div className="border-t p-4  text-center" >
                    {(role === "student" || role === "mentor") ?

                        <button onClick={handleLogoutUser} className="  text-white  text-center text-sm  bg-black py-2 px-4 my-2 rounded-4xl font-bold">Logout</button>

                        : <Link to="../login" className="  text-white  text-center text-sm  bg-black py-2 px-4 my-2 rounded-4xl font-bold">Login</Link>
                    }
                </div >

            </aside >


        </div >
    );
};

export default AnimatedSidebar;