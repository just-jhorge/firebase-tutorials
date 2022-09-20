import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.config";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const handleInput = (e) => {
        let newInput = { [e.target.name]: e.target.value };
        setData({ ...data, ...newInput });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(auth);
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((response) => {
                // console.log(response.user);
                navigate("/dashboard");
            })
            .catch((err) => alert(err.message));
    };

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            <div className="mb-4">
                <form className="flex flex-col space-y-3">
                    <input
                        type="text"
                        placeholder="E-mail"
                        name="email"
                        onChange={(e) => handleInput(e)}
                        className="p-2 rounded-md border-[1px] border-gray-300"
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => handleInput(e)}
                        placeholder="password"
                        className="p-2 rounded-md border-[1px] border-gray-300"
                    />
                    <button
                        className="p-2 border-[1px] border-black rounded-md hover:bg-black hover:text-white transition-colors"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </form>
            </div>
            <div>
                First time?
                <Link to="/signup" className="text-red-600 ml-1">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default SignIn;
