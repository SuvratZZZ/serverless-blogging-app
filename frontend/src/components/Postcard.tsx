import axios from "axios";
import { useState } from "react";
import api from "../api/config";

function Postcard({title , content , author , date , id ,author_id} : 
    {title : string , content : string , author : string , date? : Date , id:string , author_id:string}
) {
    const [con,setcon] = useState<string>(content.slice(0,100))

    const handledel = async ()=>{
        try{
            api.delete(`/blog/post/${id}`)
            alert('deleted')
        }
        catch(e){
            alert('unable to del')
        }
    }
    return (
        <div className="m-2 p-2 border border-gray-200 rounded-md shadow-md  ">
            <div  onClick={()=>setcon(content)} className="uppercase cursor-pointer text-xl font-bold">{title}</div>
            <div className="w-full justify-items-end ">
                    <div className="text-sm text-gray-500"> by...{author}</div>
            </div>
            <div className="h-15 overflow-hidden text-sm text-gray-500">{con}</div>
            <div className="flex justify-end">
            
                <div className="pl-1 pr-1 m-1 bg-black cursor-pointer text-white rounded-md">like</div>
                <div className="pl-1 pr-1 m-1 bg-black cursor-pointer text-white rounded-md">comment</div>
                {(author_id===localStorage.getItem("author_id"))?
                (<div className="pl-1 pr-1 m-1 bg-black cursor-pointer text-white rounded-md" onClick={handledel}>delete</div>)
                :(<></>)}
            </div>
        </div>
    );
}

export default Postcard;