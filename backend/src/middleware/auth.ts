import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt"

export const auth_ver = async (c:any,next:any)=>{

    // const token = getCookie(c,'auth_token');
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader) {
        c.json({ message: 'Unauthorized' }, 401)
        return c.json({ message: 'Unauthorized' }, 401)
    }
    
    const token = authHeader.split(' ')[1]; 
    console.log("tis is -> ",token)
    if(!token){
        c.status(403);
        console.log("no-token");
        return c.json({error : "No Token"});
    }
    if(await verify( token ,c.env.JWT_S)){
        console.log("verifed");
        await next();
    }else{
        c.status(403);
        return c.json({error : "unauthorised"});
    }
}