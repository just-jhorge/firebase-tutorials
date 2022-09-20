import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider } from "./firebase.config";

const SignUp = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const handleInput = (e) => {
        let newInput = { [e.target.name]: e.target.value };
        setData({ ...data, ...newInput });
    };

    const signUpWithEmailandPassword = (e) => {
        e.preventDefault();
        console.log(auth);
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                navigate("/dashboard");
            })
            .catch((err) => alert(err.message));
    };

    const signUpWithGoogle = (e) => {
        e.preventDefault();
        console.log(auth);
        signInWithPopup(auth, googleProvider)
            .then(() => {
                navigate("/dashboard");
            })
            .catch((err) => alert(err.message));
    };

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            <button
                className="border-[1px] border-gray-200 mb-4 rounded-md py-2 px-16"
                onClick={signUpWithGoogle}
            >
                Sign in With Google
            </button>
            <div className="mb-4">or</div>
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
                        onClick={signUpWithEmailandPassword}
                    >
                        Submit
                    </button>
                </form>
            </div>
            <div>
                Already have an account?{" "}
                <Link to="/signin" className="text-green-600 ml-1">
                    Sign In
                </Link>
            </div>
        </div>
    );
};

export default SignUp;
