import { Link } from "react-router-dom";
import "./App.css";
import { useNavigate } from "react-router-dom";

export default function Home({ User }) {

    const { role, name, lastName } = User || {}

    const navigate = useNavigate()

    function handleReloadPage() {
        navigate(0)
    }

    if (!role) {

        handleReloadPage()
    }



    return (
        <>
            <div className=" font-bold w-ful h-full  flex flex-col   items-center gap-4  ">
                <h1 className="mt-32  text-2xl text-center " >Welcome The BookSlots {(role === "student" || role === "mentor") ? name + " " + lastName : ""}  </h1>
                {(role === "student" || role === "mentor") ? '' : <p className="text-sm text-center " >First you create Account and login as a Mentor or student ? </p>}

                {
                    (role === "student" || role === "mentor") ? role === "student" ? <Link to="../Student/viewSession" className="bg-black  text-white px-4 py-2  rounded-4xl" >Get Started  </Link> : <Link to="../Mentor/createTimeSlots" className="bg-black  text-white px-4 py-2  rounded-4xl" >Get Started  </Link>
                        : <Link to="/login" className="bg-black  text-white px-4 py-2  rounded-4xl" >Get Started  </Link>
                }

                <div className="text-center">
                    detail about the web
                </div>
            </div>
        </>
    );

}

