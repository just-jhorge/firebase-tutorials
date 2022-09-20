import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDBYTh74p_zD6M7mqrVjnT0vxf3DJuu99Q",
    authDomain: "fir-tutorials-7cf90.firebaseapp.com",
    projectId: "fir-tutorials-7cf90",
    storageBucket: "fir-tutorials-7cf90.appspot.com",
    messagingSenderId: "691860772822",
    appId: "1:691860772822:web:1519c6a844b97aaeb6f677",
    measurementId: "G-C675E7WSE8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, googleProvider, auth };
