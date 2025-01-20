import { useEffect, useState } from "react";
import api from "../api/config";
import Postform from "../components/Postform";

function Blog() {
    const [posts,setposts] = useState<any[]>([]);
    async function getpost(){
        const data = await api.get('/blog/posts'

        )
        console.log(data.data);
        setposts(data.data.post);
    }
    useEffect(()=>{
        getpost(); 
    },[])
    
    return (
        <div>
            <div>
                <Postform/>
            </div>
            { 
                ( posts !=undefined)? (
                posts.map((post: any, index: number) => (
                    <div key={index}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                ))
                ) : (
                    <p className="w-screen h-screen flex justify-center items-center">No posts available.</p>
            )}
        </div>
    );
}

export default Blog;