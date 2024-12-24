import { Hono } from 'hono'
import { userRoute } from './routes/user';
import { blogRoute } from './routes/blog';

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_S: string
  }
}>();

app.route('/api/user',userRoute);
app.route('/api/blog',blogRoute);

export default app
