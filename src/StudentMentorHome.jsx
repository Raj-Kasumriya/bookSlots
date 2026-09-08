
import "./App.css";
import { Navigate } from "react-router-dom";

export default function StudentMentorHome({ User }) {

    const { role, name, lastName } = User || {}

    if (!role) {
        return <Navigate to="/" />
    }

    return (
        <>
            <div className=" font-bold h-full  flex flex-col   items-center gap-4  ">
                <h1 className="mt-32  text-4xl " >Welcome {name} {lastName}  </h1>
            </div>
        </>
    );

}

