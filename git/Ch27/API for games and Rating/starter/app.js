import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { sql } from "./database/database.js";

const app = new Application();
const router = new Router();

// Retrieve all games
const getGames = async ({ response }) => {
  response.body = await sql`SELECT * FROM games`;
};

// Retrieve a specific game
const getGame = async ({ response, params }) => {
  const rows = await sql`SELECT * FROM games WHERE id = ${params.id}`;
  response.body = rows.length > 0 ? rows[0] : { status: "not found" };
};

// Add a new game
const addGame = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  const result = await sql`INSERT INTO games (name) VALUES (${document.name})`;
  console.log(result); // Log the result to check if there are any issues
  response.body = { status: "success" };
};


// Delete a game
const deleteGame = async ({ params, response }) => {
  await sql`DELETE FROM games WHERE id = ${params.id}`;
  await sql`DELETE FROM ratings WHERE game_id = ${params.id}`;
  response.body = { status: "success" };
};

// Add a new rating to a specific game
const addRating = async ({ request, params, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  await sql`INSERT INTO ratings (rating, game_id) VALUES (${document.rating}, ${params.id})`;

  response.body = { status: "success" };
};

// Retrieve all ratings for a specific game
const getRatings = async ({ response, params }) => {
  response.body = await sql`SELECT * FROM ratings WHERE game_id = ${params.id}`;
};

router.get("/games", getGames);
router.get("/games/:id", getGame);
router.post("/games", addGame);
router.delete("/games/:id", deleteGame);
router.post("/games/:id/ratings", addRating);
router.get("/games/:id/ratings", getRatings);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
