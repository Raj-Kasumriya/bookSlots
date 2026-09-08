import { useState, useContext } from "react";
import "./App.css";
import { Link } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io";
import { userContexts } from "./App";
import AnimatedSidebar from "./Sidebar";

export default function NavbarMentorStudent({ User }) {

    return (
        <>
            <div className=" flex  gap-4  items-center text-white  bg-blue-800 px-4  py-5  fixed top-0 right-0 left-0 " >

                {<AnimatedSidebar />}
                <h1 className="font-bold  text-xl"  >BookSlots</h1>
            </div>


        </>
    );
}

