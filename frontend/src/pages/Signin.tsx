import { useRef, useState } from "react";
import Quote from "../components/Quote";
import axios from "axios";
import Inup from "../components/Inup";
import { useNavigate } from "react-router-dom";

function Signin() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [ass, setass] = useState<string>("");
    const nav = useNavigate();
    
    const sign = async () => {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      console.log("Password:", password);

      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }
      try{
          const data = await axios.post(import.meta.env.VITE_BACKEND+'/api/user/signin',
            {email,password}
          );
          console.log(data);
          nav("/blog");
      }
      catch(e){
        console.log(e);
        setass("unable to signin try again");
      }
    }
    return (
        <div className="md:grid grid-cols-2">
            <div className="h-screen flex justify-center items-center">
                <div className="pl-10 pr-10 pt-5 pb-5 font-bold rounded shadow-md">
                    <Inup label="Email" placeholder="enter email" refr={emailRef} />
                    <Inup label="password" placeholder="enter password" refr={passwordRef} />
                    <div className="flex text-xs font-light w-full justify-center">{ass}</div>
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