import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import * as ticketsService from "./services/ticketsService.js";
import { sql } from "./database/database.js";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);
app.use(async (context, next) => {
  if (context.request.method === "POST") {
    const body = context.request.body();
    const params = await body.value;
    await sql`INSERT INTO tickets (content, reported_on) VALUES (${params.get("content")}, NOW())`;
    context.response.redirect("/tickets");
  } else {
    await next();
  }
});

const listTickets = async ({ render }) => {
  render("index.eta", { tickets: await ticketsService.findAll() });
};

router.get("/tickets", listTickets);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
