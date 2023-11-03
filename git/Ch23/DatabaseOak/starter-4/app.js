import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { router } from "./routes/routes.js";

const app = new Application();
app.use(renderMiddleware);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
