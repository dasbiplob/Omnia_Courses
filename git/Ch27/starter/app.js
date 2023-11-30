import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { sql } from "./database/database.js";

const app = new Application();
const router = new Router();

const listSongs = async ({ response }) => {
  response.body = await sql`SELECT id, name, rating FROM songs`;
};

const getSongsById = async ({ params, response }) => {
  const songId = params.id;
  const song = await sql`SELECT id, name, rating FROM songs WHERE id = ${songId}`
  response.body = song[0] || {};
};

const addSong = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  await sql`INSERT INTO songs (name, ratings) VALUES (${document.name}, ${document.ratings})`;

  response.body = { status: "success" };
};

const deleteSongs = async ({ params, response }) => {
  const songId = params.id;

  await sql`DELETE FROM songs WHERE id = ${songId})`;

  response.body = { status: "success" };
};

router.get("/songs", listSongs)
.get("/songs/:id", getSongsById)
.post("/songs", addSong)
.delete("/songs/:id",deleteSongs);

app.use(router.routes());

if (!Deno.env.get("TEST_ENVIRONMENT")) {
  app.listen({ port: 7777 });
}

export default app;
