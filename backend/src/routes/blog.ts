import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { auth_ver } from '../middleware/auth';
import { error } from 'console';

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

blogRoute.delete('/post/:id',auth_ver,async(c)=>{
    const del_id : string=c.req.param('id')
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
      await prisma.post.delete({
        where:{
          id: del_id
        }
      })
      return c.json({sucess:'deleted'})
    }
    catch(e){
      c.status(411)
      return c.json({error:'unable to del'})
    }
});

blogRoute.get('/posts', auth_ver , async (c) => {
    console.log(c.req);
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try{
      const blogs = await prisma.post.findMany({
        include :{
          author :{
            select :{
              name : true ,
              id : true
            }
          }
        }
      });
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