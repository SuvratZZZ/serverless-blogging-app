import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { setCookie } from 'hono/cookie'

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_S: string
  }
}>();

userRoute.post('/signup',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try{
    const user = await prisma.user.create({
      data:{
        name : body.name,
        email : body.email,
        password : body.password,
      }
    })
    console.log(user);
    return c.redirect('/api/signin');
  }
  catch(e){
    console.log(e);
    c.status(403);
    return c.json({error : "unable to signup" ,
                  detail : e 
    })
  }
})

userRoute.post('/signin', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    console.log(body.email)
    console.log(body.password)
    try{
      const user = await prisma.user.findUnique({
        where:{
          // name : body.name,
          email : body.email,
          password : body.password
        }
      })
      if(!user){
        c.status(403);
        return c.json({error:" user not found "})
      }
      const token = await sign({id : user.id},c.env.JWT_S);
      setCookie(c,'auth_token', token, {
        httpOnly: true,  // Ensures the cookie is only accessible by the server (not client-side JS)
        secure: process.env.NODE_ENV === 'production',  // Only set the cookie over HTTPS in production
        path: '/',  // Make the cookie available throughout the app
        maxAge: 60 * 60 * 24 * 7, // 1 week expiration
      });
      // Redirect to the home page
      return c.json({success : "signed in"});
    }
    catch(e){
      console.log(e);
      c.status(411);
      return c.json({error : "unable to signin"})
    }
  })