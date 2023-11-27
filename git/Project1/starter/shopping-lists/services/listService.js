import { sql } from "../database/database.js";

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const findAllActiveShopping_lists = async()=>{
  return await sql`SELECT * FROM shopping_lists WHERE active = true`;
}

const deactivateById = async (id) => {
await sql`UPDATE shopping_lists 
  SET active = false WHERE id = ${id}`;
}

const findById = async (id) => {
const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${ id }`;


if (rows && rows.length > 0) {
  return rows[0];
}

return { id: 0, name: "Unknown" };
};

const countShoppingLists = async () => {
const rows = await sql`SELECT COUNT(*) AS count from shopping_lists`;
return rows[0].count;
}

const countShoppingListsItems = async () => {
const rows = await sql`SELECT COUNT(*) AS count from shopping_list_items`;
return rows[0].count;
}

export { countShoppingLists, countShoppingListsItems, create, deactivateById, findAllActiveShopping_lists, findById };
