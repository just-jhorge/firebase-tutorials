import React, { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth, googleProvider, db } from "./firebase.config";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const SignUp = () => {
    const [data, setData] = useState({});
    const navigate = useNavigate();

    const handleInput = (e) => {
        let newInput = { [e.target.name]: e.target.value };
        setData({ ...data, ...newInput });
    };

    const fetchUser = async (user) => {
        try {
            const q = query(
                collection(db, "users"),
                where("uid", "==", user.uid)
            );
            const doc = await getDocs(q);
            if (doc.docs.length === 0) {
                return true;
            }
        } catch (err) {
            console.log(err.message);
            return false;
        }
    };

    const signUpWithEmailandPassword = async (e) => {
        try {
            e.preventDefault();
            const response1 = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );
            let user = response1.user;
            if (fetchUser(user)) {
                console.log("user does not exist, adding new user...");
                const response2 = await addDoc(collection(db, "users"), {
                    name: data.name,
                    email: data.email,
                    id: Math.random() * 1000,
                });
                user = response2;
                navigate("/dashboard");
            } else {
                console.log("user already exists, logging in...");
                signInWithEmailAndPassword(
                    auth,
                    data.email,
                    data.password
                ).then(() => navigate("/dashboard"));
            }
        } catch (err) {
            console.log("Error adding document: " + err);
        }
    };

    const signUpWithGoogle = async (e) => {
        try {
            e.preventDefault();

            // try signing in with the google popup
            const response1 = await signInWithPopup(auth, googleProvider);

            // pick user from the response1
            let user = response1.user;

            // check firebase firestore if the user above exits
            const q = query(
                collection(db, "users"),
                where("uid", "==", user.uid)
            );

            // assign the response to docs
            let doc = await getDocs(q);

            // if the docs doesn't exist, create a new user
            if (doc.docs.length === 0) {
                console.log("There is no such user, adding new user...");
                const response2 = await addDoc(collection(db, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    email: user.email,
                });
                console.log(response2);
                user = response2.user;

                doc = await getDocs(q);
                console.log(doc);
            } else {
                console.log("User already exits, logging in...");
            }

            navigate("/dashboard");
        } catch (err) {
            console.log(err.message);
        }
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
                        placeholder="Full Name"
                        name="name"
                        onChange={(e) => handleInput(e)}
                        className="p-2 rounded-md border-[1px] border-gray-300"
                    />
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
