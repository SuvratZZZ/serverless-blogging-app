import { Hono } from 'hono'
import { userRoute } from './routes/user';
import { blogRoute } from './routes/blog';
import { quoteRoute } from './routes/quote';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_S: string
  }
}>();

// app.use('/*',cors({
//   origin : 'https://localhost:8000/',
//   // allowHeaders: ['*'],
//   // allowMethods: ['*'],
//   // exposeHeaders: ['*'],
//   credentials: true,
// }));

// app.use(cors());

app.use('*', async (c : any ,next : any )=>{
  console.log(c.req);
  await next();
})

app.route('/api/user',userRoute);
app.route('/api/blog',blogRoute);
app.route('/api/quote',quoteRoute);

export default app
