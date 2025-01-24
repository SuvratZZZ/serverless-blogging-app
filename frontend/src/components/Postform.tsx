import { useRef, useState } from "react";
import Inup from "./Inup";
import api from "../api/config";

function Postform() {
    const titleref=useRef<HTMLInputElement>();
    const contentref=useRef<HTMLInputElement>();

    const [sendpo,setsendpo] = useState<{}>({});
    const [ale,setale] = useState<string>();
    const [postbox,setpostbox] = useState<boolean>(true);
    const togglePostbox=()=>{
        setpostbox(!postbox)
    }
    const sendPostobj = async ()=>{
        if(contentref.current?.value === undefined || titleref.current?.value === undefined){
            setale('*enter valid content');
            return;
        }
        else if(contentref.current?.value.length < 10 || contentref.current?.value.length === 0 ){
            setale('*enter content of valid length');
            return;
        }
        setsendpo({
            "title"     : titleref.current?.value,
            "content"   : contentref.current?.value,
            // "author"    : localStorage.getItem('author'),
            "id"        : localStorage.getItem('author_id'),
            "published" : false
        })
        try{
            const res = await api.post('blog/post',sendpo);
            console.log(res);
            alert('posted sucessfully');
            setpostbox(true);
        }
        catch(e){
            console.log(e);
            setale("*unable to post")
        }
    }
    return (
        <div>
        {(postbox==false)?
            (   
                <div className="fixed  bottom-0 right-0 m-4 p-5 h-2/3 w-2/3 bg-white shadow-lg rounded-lg border border-gray-200 flex flex-col">
                        <div onClick={togglePostbox} className=" pr-1 full cursor-pointer z-15 font-bold text-right  " >X</div>
                        <div className="w-full flex">
                            <h3 className="w-full text-center">Create A Post</h3>
                        </div>
                        
                        <div className="w-full animate-pulse text-center text-red-600 text-xs font-thin "
                        >{ale}</div>
                        <Inup label="Title" placeholder="Enter nice title" refr={titleref} />
                        <Inup label="Content" placeholder="Enter nice content" refr={contentref} type="tex" wid="50" />
                        <div>
                        <button onClick={sendPostobj} className=" fixed  bottom-0 right-0 pl-5 pr-5 pt-1 pb-1 bg-white shadow-lg rounded-lg border border-gray-200 m-8 z-15" >post blog</button>
                        </div>
                </div>
            ):(
                <div>
                <button onClick={togglePostbox} className=" fixed  bottom-0 right-0 p-5 bg-white shadow-lg rounded-lg border border-gray-200 m-4 z-15" >create blog</button>
                </div>
            )}
        </div>
    );
}

export default Postform;