import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { auth_ver } from '../middleware/auth';

export const blogRoute = new Hono<{
    Bindings: {
      DATABASE_URL: string
      JWT_S: string
    }
  }>();

  blogRoute.post('/post', auth_ver , async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const body = await c.req.json();
    console.log(body);
    try{
      const user = await prisma.post.create({
        data:{
          title     : body.title    ,
          content   : body.content  ,
          published : body.published,
          // author    : body.author   ,
          authorId  : body.id 
        }
      })
      console.log("posted")
      return c.json({sucess : "posted"});
    }
    catch(e){
      console.log(e);
      c.status(403);
      return c.json({error : "unable to post"})
    }
})

blogRoute.get('/posts', auth_ver , async (c) => {
    console.log(c.req);
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
      const blogs = await prisma.post.findMany();
      console.log(blogs);
      console.log("send posted")
      return c.json({blogs});
    }
    catch(e){
      console.log(e);
      c.status(403);
      return c.json({error : "unable to get posts"})
    }
})

blogRoute.get('/get/:id', auth_ver , async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    const id = c.req.param('id');
    try{
      const blog = await prisma.post.findUnique({
        where:{
            id : id
        }
      });
      console.log("osted")
      return c.json({blog});
    }
    catch(e){
      // console.log(e);
      c.status(403);
      return c.json({error : "unable to get post"})
    }
  })

  blogRoute.get('*', (c) => {
    return c.text('Home*!')
  })