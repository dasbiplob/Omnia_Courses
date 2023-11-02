import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";

const app = new Application();

const hello = async ({ cookies, response }) => {
  await cookies.set("hello", "world");
  response.body = "Hello world!";
};

app.use(hello);

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
