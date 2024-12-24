import { verify } from "hono/jwt"

export const auth_ver = async (c:any,next:any)=>{
    if(await verify(c.req.header('token'),c.env.JWT_S)){
        console.log("verifed");
        await next();
    }else{
        c.res.status(403);
        return c.res.json({error : "unauthorised"});
    }
}