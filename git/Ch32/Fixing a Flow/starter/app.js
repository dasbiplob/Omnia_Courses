import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { sql } from "./database/database.js";
import { Session } from "https://deno.land/x/oak_sessions@v4.1.9/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

const app = new Application();
app.use(renderMiddleware);

app.use(Session.initMiddleware());

const router = new Router();

const showRegistrationForm = ({ render }) => {
  render("register.eta");
};

const postRegistrationForm = async ({ request, response }) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get("email");
  const password = params.get("password");
  const verification = params.get("verification");

  if (password !== verification) {
    response.body = "The entered passwords did not match";
    return;
  }

  const existingUsers = await sql`SELECT * FROM users WHERE email = ${ email }`;
  if (existingUsers.length > 0) {
    response.body = "The email is already reserved.";
    return;
  }

  const hash = await bcrypt.hash(password);
  await sql`INSERT INTO users (email, password) VALUES (${email}, ${hash})`;
  response.body = "Registration successful!";
};

const postLoginForm = async ({ request, response, state }) => {
  const body = request.body();
  const params = await body.value;

  const email = params.get("email");
  const password = params.get("password");

  // check if the email exists in the database
  const rows = await sql `SELECT * FROM users WHERE email = ${ email }`;
  if (rows.length === 0) {
    response.status = 401;
    return;
  }

  // take the first row from the results
  const userObj = rows[0];

  const hash = userObj.password;

  const passwordCorrect = await bcrypt.compare(password, hash);
  if (!passwordCorrect) {
    response.status = 401;
    return;
  }

  await state.session.set("authenticated", true);
  await state.session.set("user", {
    id: userObj.id,
    email: userObj.email,
  });
  response.body = "Authentication successful!";
};

const showLoginForm = ({ render }) => {
  render("login.eta");
};

router.get("/", ({ render }) => render("index.eta"));
router.get("/auth/register", showRegistrationForm);
router.post("/auth/register", postRegistrationForm);
router.get("/auth/login", showLoginForm);
router.post("/auth/login", postLoginForm);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
