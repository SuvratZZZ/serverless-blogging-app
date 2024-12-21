import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/extension'
import { withAccelerate } from '@prisma/extension-accelerate'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
  }
}>()

app.post('/api/signup', (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  return c.text('Hello Hono!')
})
app.post('/api/signin', (c) => {
  return c.text('Hello Hono!')
})
app.post('/api/blog', (c) => {
  return c.text('Hello Hono!')
})
app.put('/api/blog', (c) => {
  return c.text('Hello Hono!')
})
app.get('/api/blog/:id', (c) => {
  return c.text('Hello Hono!')
})
app.get('*', (c) => {
  return c.text('Home*!')
})

export default app
