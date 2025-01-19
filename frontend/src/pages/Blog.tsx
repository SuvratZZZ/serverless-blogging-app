import { useEffect, useState } from "react";
import api from "../api/config";

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
            { 
                posts.length > 0 ? (
                posts.map((post: any, index: number) => (
                    <div key={index}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                ))
                ) : (
                    <p>No posts available.</p>
            )}
        </div>
    );
}

export default Blog;