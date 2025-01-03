import { Hono } from 'hono'

export const quoteRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_S: string
    API_KEY: string
  }
}>();

quoteRoute.get('/',async (c) => {
    try {
      const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
        headers: {
          'X-Api-Key': c.env.API_KEY,
        },
      });
      if (!response.ok) {
        return c.text('Error fetching quote', 500);
      }
      const data = await response.json();
      console.log(data);
      return c.json({data : data});
    } catch (error) {
      console.error('Error:', error);
      return c.text('Something went wrong!', 500);
    }
  })
