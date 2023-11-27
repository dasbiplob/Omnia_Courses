import { sql } from "../database/database.js";

export const addItem = async (listId, name) => {
  await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${listId}, ${name})`;
};

export const getCollectedItems = async (listId) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${listId} AND collected = TRUE ORDER BY name`;
};

export const getUncollectedItems = async (listId) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${listId} AND collected = FALSE ORDER BY name`;
};

export const collecItem = async (itemId) => {
  await sql`UPDATE shopping_list_items SET collected = TRUE WHERE id = ${itemId}`;
};

export const countAllItems = async () => {
  return await sql`SELECT COUNT(*) AS count FROM shopping_list_items`;
};
