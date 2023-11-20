import { sql } from "../database/database.js";

const createItem = async (shopping_list_id, name) => {
  if (shopping_list_id === undefined || name === undefined || name === null) {
    console.error("shopping_list_id or name is undefined");
    return;
}
  await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${shopping_list_id}, ${name})`;
};

const getItemNum = async () => {
  let result = await executeQuery("SELECT COUNT(id) FROM shopping_list_items;")
  return result.rows[0].count
};

const findAllByShoppingListId = async (shopping_list_id) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${shopping_list_id} ORDER BY collected DESC, name DESC`;
  };

  const getCollectedItemByListId = async (shopping_list_id) => {
    return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${shopping_list_id} ORDER BY collected, name`;
  };

const updateItemById = async (item_id) => {
  await sql`UPDATE shopping_list_items
    SET collected = TRUE WHERE id = ${ item_id }`;
};

const updateItemByListId = async (shopping_list_id) => {
  await sql`UPDATE shopping_list_items SET collected = TRUE WHERE shopping_list_id = ${ shopping_list_id }`;
};

export { createItem, findAllByShoppingListId, updateItemById, getCollectedItemByListId, updateItemByListId, getItemNum };
