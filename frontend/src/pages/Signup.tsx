import { useRef, useState } from "react";
import Inup from "../components/Inup";
import Quote from "../components/Quote";
import { useNavigate } from "react-router-dom";
import api from "../api/config";

function Signup() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const repasswordRef = useRef<HTMLInputElement>(null);
    const [ass, setass] = useState<string>("");
    const nav = useNavigate();
    
    const sign = async () => {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      const name = nameRef.current?.value;
      const repassword = repasswordRef.current?.value;
      console.log("Password:", password);
        if(password!=repassword){
            setass("enter same password")
            return;
        }
      if (!email || !password || !name || !repassword) {
        setass("Please enter both email and password.");
        return;
      }
      try{
          const data = await api.post('/user/signup',
            {name,email,password},
            // { withCredentials : true }
          );
          localStorage.setItem("auth_token" , data.data.auth_token);
          localStorage.setItem("author" , data.data.author);
          localStorage.setItem("author_id" , data.data.author_id);
          console.log(data);
          nav("/signin");
      }
      catch(e){
        console.log(e);
        setass("unable to signin try again");
      }
    }
    return (
        <div className="md:grid grid-cols-2">
            <div className="w-full h-screen flex justify-center items-center">
                <div className="w-4/5 pl-10 pr-10 pt-5 pb-5 font-bold rounded shadow-md">
                    <h1 className=" text-2xl w-full font-bold text-center ">Create an account</h1>
                    <p className=" pb-4 text-xs font-light text-center">Already have account? <u className="cursor-pointer" onClick={()=>nav('/signin')}>signin</u> </p>
                    <Inup label="Email" placeholder="enter email" refr={emailRef} />
                    <Inup label="Name" placeholder="enter name" refr={nameRef} />
                    <Inup type="pass" label="password" placeholder="enter password" refr={passwordRef} />
                    <Inup type="pass" label="again-password" placeholder="re-enter password" refr={repasswordRef} />
                    <div className="flex text-xs font-light w-full justify-center">{ass}</div>
                    <div className="w-full flex justify-center">
                        <button className="w-full p-1 mt-5 bg-black text-white rounded-sm mb-2" onClick={sign}> Signin </button>
                    </div>
                </div>
            </div>
            <div className="hidden md:inline">
                <Quote/>
            </div>
        </div>
    );
}

export default Signup;  