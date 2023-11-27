import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { sql } from "./database/database.js";

const app = new Application();
const router = new Router();

app.use(renderMiddleware);

const getSongs = async () => {
  return await sql`SELECT * FROM songs`;
};

const addSong = async (name, rating) => {
  await sql`INSERT INTO songs (name, rating) VALUES (${name}, ${rating})`;
};

const showForm = async ({ render }) => {
  render("index.eta", { songs: await getSongs(), name: "", rating: "", errors: [] });
};

const validate = (name, rating) => {
  const errors = [];

  if (!name || name.length < 5 || name.length > 20) {
    errors.push("Song name must be between 5 and 20 characters long.");
  }

  const ratingNumber = parseInt(rating);
  if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 10) {
    errors.push("Rating must be a number between 1 and 10.");
  }

  return errors;
};

const submitForm = async ({ request, response, render }) => {
  const body = request.body();
  const params = await body.value;

  const name = params.get("name") || "";
  const rating = params.get("rating") || "";

  const errors = validate(name, rating);

  if (errors.length > 0) {
    render("index.eta", { songs: await getSongs(), name, rating, errors });
  } else {
    await addSong(name, rating);
    response.redirect("/");
  }
};

router.get("/", showForm);
router.post("/", submitForm);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
