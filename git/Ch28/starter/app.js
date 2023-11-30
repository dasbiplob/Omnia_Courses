import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { router } from "./routes/routes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";

const app = new Application();

app.use(errorMiddleware);
app.use(renderMiddleware);

app.use(router.routes());

export { app };

// if you wish to run the application, uncomment the following line
// for local testing -- remember to comment it when returning the app
// for testing
// app.listen({ port: 7777 });
