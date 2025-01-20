import { useRef, useState } from "react";
import Inup from "./Inup";

function Postform() {
    // const postref=useRef<{HTMLInputElement,HTMLInputElement}>(null);
    const [postbox,setpostbox] = useState<boolean>(true);
    const togglePostbox=()=>{
        setpostbox(!postbox)
    }
    return (
        <div>
        {(postbox==false)?
            (   
                <div className="fixed  bottom-0 right-0 m-4 p-5 h-2/3 w-2/3 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col">
                        <div className="w-full flex">
                            <h3 className="w-5/6 text-center">Create A Post</h3>
                            <button onClick={togglePostbox} className=" pr-0 w-1/6 z-15 font-bold " >X</button>
                        </div>
                        <Inup label="Title" placeholder="Enter nice title" refr={null} />
                        <Inup label="Content" placeholder="Enter nice content" />
                </div>
            ):(
                <div>
                <button onClick={togglePostbox} className=" fixed  bottom-0 right-0 m-4 z-15" >create blog</button>
                </div>
            )}
        </div>
    );
}

export default Postform;