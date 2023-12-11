import {
  Application,
  Router,
  send,
} from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { sql } from "./database/database.js";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);

const serveStaticFilesMiddleware = async (context, next) => {
  if (context.request.url.pathname.startsWith("/static")) {
    const path = context.request.url.pathname.substring(7);
    await send(context, path, {
      root: `${Deno.cwd()}/static`,
    });
  } else {
    await next();
  }
};

app.use(serveStaticFilesMiddleware);

const listNames = async ({ response }) => {
  response.body = await sql`SELECT * FROM names`;
};

const addName = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  await sql.unsafe("INSERT INTO names (name) VALUES ('" + document.name + "');");
  response.status = 200;
};

router.get("/", ({ render }) => render("index.eta"));
router.get("/api/names", listNames);
router.post("/api/names", addName);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
