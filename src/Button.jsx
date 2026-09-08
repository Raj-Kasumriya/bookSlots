import { Link } from "react-router-dom";
import "./App.css";

export default function Button({ className, children, ...rest }) {

    return (
        <Link
            {...rest}
            className={" rounded-3xl text-white bg-indigo-700 text-sm  px-5 " + className} > {children}
        </Link>
    )

}