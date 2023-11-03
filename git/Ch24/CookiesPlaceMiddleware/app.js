import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";

const app = new Application();

const cookieGreet = async ({ cookies, response }) => {
    const count = await cookies.get("count");
    response.body = `Hello world - ${count}`;
  };

const countMiddleware = async ({ cookies }, next) => {
    let count = await cookies.get("count");
    if (!count) {
      count = 1;
    }
  
    await cookies.set("count", Number(count) + 1);
  
    await next();
  };

app.use(cookieGreet);
app.use(countMiddleware);
app.listen({ port: 7777 });
