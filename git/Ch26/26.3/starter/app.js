import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import {
  required,
  isString,
  isNumber,
  lengthBetween,
  validate,
} from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);

const showForm = ({ render }) => {
  render("index.eta", { errors: [], name: "", yearOfBirth: "" });
};

const submitForm = async ({ request, response, render }) => {
  const body = request.body();
  const params = await body.value;

  const rules = {
    name: [required, isString, lengthBetween(4, 20)],
    yearOfBirth: [required, isNumber, (value) => value >= 1900 && value <= 2000],
  };

  const [passes, errors] = await validate(params, rules);

  if (passes) {
    // Data is valid, could store it
    response.redirect("/");
  } else {
    // Data is invalid, render errors
    render("index.eta", {
      errors: errors.map((error) => error.message),
      name: params.get("name") || "",
      yearOfBirth: params.get("yearOfBirth") || "",
    });
  }
};

router.get("/", showForm);
router.post("/", submitForm);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
