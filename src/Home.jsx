import { Link } from "react-router-dom";
import "./App.css";



export default function Home({ User }) {

    const { role } = User || {}



    return (
        <>
            <div className=" font-bold h-full  flex flex-col   items-center gap-4  ">
                <h1 className="mt-32  text-4xl " >Welcome The BookSlots  </h1>
                <p className="text-sm" >First you create Account and login as a Mentor or student ? </p>

                {
                    (role === "student" || role === "mentor") ? <Link to="/Home" className="bg-black  text-white px-4 py-2  rounded-4xl" >Get Started  </Link>
                        : <Link to="/login" className="bg-black  text-white px-4 py-2  rounded-4xl" >Get Started  </Link>
                }

                <div>
                    detail about the web
                </div>
            </div>
        </>
    );

}

