import { useEffect, useState } from "react";
import api from "../api/config";
import Postform from "../components/Postform";
import Postcard from "../components/Postcard";
import Nav from "../components/Nav";

function Blog() {
    const [posts,setposts] = useState<any[]>([]);
    async function getpost(){
        const data = await api.get('/blog/posts'

        )
        console.log(data.data);
        setposts(data.data.blogs);
    }
    useEffect(()=>{
        getpost(); 
    },[])
    
    return (
        <>
        <Nav/>
        <div>
            <div>
                <Postform/>
            </div>
            { 
                ( posts !=undefined)? (
                posts.map((post: any, index: number) => (
                    <div key={index}>
                        <Postcard title={post.title} content={post.content} author={post.author} />
                    </div>
                ))
                ) : (
                    <p className="w-screen h-screen flex justify-center items-center">No posts available.</p>
            )}
        </div>
        </>
    );
}

export default Blog;