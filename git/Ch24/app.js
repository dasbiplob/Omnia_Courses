import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";

const app = new Application();

const hello = async ({ cookies, response }) => {
  let secret = "undefined";
  if (await cookies.get("secret")) {
    secret = await cookies.get("secret");
  }

  response.body = `The secret is ${secret}`;
};

app.use(hello);

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
