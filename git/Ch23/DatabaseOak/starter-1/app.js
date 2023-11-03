import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import * as ticketsService from "./services/ticketsService.js";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);

const listTickets = async ({ render }) => {
  render("index.eta", { tickets: await ticketsService.findAll() });
};

router.get("/tickets", listTickets);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
