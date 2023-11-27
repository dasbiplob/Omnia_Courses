import { sql } from "../database/database.js";

export const addList = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
};

export const getList = async (id) => {
  return await sql`SELECT * FROM shopping_lists WHERE id = ${id}`;
};

export const getActiveLists = async () => {
  return await sql`SELECT * FROM shopping_lists WHERE active = TRUE`;
};

export const deactivateList = async (id) => {
  await sql`UPDATE shopping_lists SET active = FALSE WHERE id = ${id}`;
};

export const countAllLists = async () => {
  return await sql`SELECT COUNT(*) AS count FROM shopping_lists`;
};
