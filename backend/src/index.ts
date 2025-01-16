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

app.use('/*',cors());

app.route('/api/user',userRoute);
app.route('/api/blog',blogRoute);
app.route('/api/quote',quoteRoute);

export default app
