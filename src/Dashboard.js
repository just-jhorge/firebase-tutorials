import React from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase.config";

const Dashboard = () => {
    const navigate = useNavigate();

    const logout = () => {
        signOut(auth);
        navigate("/");
    };
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            <p className="mb-3">You are signed in</p>
            <button
                onClick={logout}
                className="border-2 rounded-md border-blue-400 py-1 px-3"
            >
                Sign out
            </button>
        </div>
    );
};

export default Dashboard;
