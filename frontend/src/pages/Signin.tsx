import { useRef } from "react";
import Quote from "../components/Quote";
import axios from "axios";

function Signin() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
  
    const sign = async () => {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;

      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }
      const data = await axios.post(import.meta.env.VITE_BACKEND+'/api/user/signin',{email,password});
      console.log(data);
      console.log("Password:", password);
    }
    return (
        <div className="md:grid grid-cols-2">
            <div className="h-screen flex justify-center items-center">
                <div className="pl-10 pr-10 pt-5 pb-5 font-bold rounded shadow-md">
                    <h2>Email : </h2>
                    <input className="pl-1 pb-1" placeholder="enter mail" ref={emailRef}></input>
                    <h2>password : </h2>
                    <input className="pl-1 pb-1" placeholder="enter password" ref={passwordRef}></input>
                    <div className="w-full flex justify-center">
                        <button className="w-full bg-black text-white rounded-sm mt-2 mb-2" onClick={sign}> Signin </button>
                    </div>
                </div>
            </div>
            <div className="hidden md:inline">
                <Quote/>
            </div>
        </div>
    );
}

export default Signin;