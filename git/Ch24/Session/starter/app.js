// app.js
import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { Session } from "https://deno.land/x/oak_sessions@v4.1.9/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";

const app = new Application();

app.use(Session.initMiddleware());
app.use(renderMiddleware);

const router = new Router();

const getOrCreateList = (context) => {
  // Retrieve or create a personal list for the user within the session
  if (!context.state.session.get("items")) {
    context.state.session.set("items", []);
  }
  return context.state.session.get("items");
};

const listItems = async (context) => {
  const items = getOrCreateList(context);
  context.render("index.eta", { items });
};

const addItem = async (context) => {
  const items = getOrCreateList(context);

  const body = context.request.body();
  const params = await body.value;
  
  items.push(params.get("item"));
  context.response.redirect("/");
};

router.get("/", listItems);
router.post("/", addItem);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
