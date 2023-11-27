import { sql } from "../database/database.js";

const create = async (listId, name) => {
  await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${listId}, ${name});`;
};

const findAllItems = async (listId) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${listId} 
  ORDER BY CASE WHEN collected = FALSE THEN 1 ELSE 2 END, name`;
  
  // if(rows && rows.length > 0){
  //     return rows[0]
  // }
  // return false;
};

const updateCollected = async (id) => {
  await sql`UPDATE shopping_list_items SET collected = TRUE WHERE id = ${id}`;
}

// const findById = async (id) => {
//     await sql`SELECT * FROM shopping_list_items WHERE id = ${id}`
// }

export {create, findAllItems, updateCollected};
