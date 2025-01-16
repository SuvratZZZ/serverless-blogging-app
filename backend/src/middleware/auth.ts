import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt"

export const auth_ver = async (c:any,next:any)=>{
    const req=c.
    const token = getCookie(c ,'auth_token');
    console.log(token)
    if(!token){
        c.status(403);
        c.res.json({error : "unothorised"});
    }
    if((token) && (await verify( token ,c.env.JWT_S))){
        console.log("verifed");
        c.req=req;
        await next();
    }else{
        c.status(403);
        return c.res.json({error : "unauthorised"});
    }
}