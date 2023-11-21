import { sql } from "../database/database.js";

const createItem = async (shoppingListId, name) => {
  try {
    console.log("Received data:", shoppingListId, name);
    // Check if name is provided, set a default value if not
    const itemName = name || "Default Item Name";
    
    await sql`INSERT INTO shopping_list_items (shopping_list_id, name) VALUES (${shoppingListId}, ${itemName})`;
  } catch (error) {
    console.error("Error in createItem:", error);
    throw error;
  }
};

const getItemNum = async () => {
  try {
    const result = await sql`SELECT COUNT(*) FROM shopping_list_items;`;
    console.log("Result:", result);
    return result[0].count;
  } catch (error) {
    console.error("Error in getItemNum:", error);
    throw error;
  }
};


const findAllByShoppingListId = async (shopping_list_id) => {
  return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${shopping_list_id} ORDER BY collected DESC, name DESC`;
  };

  const getCollectedItemByListId = async (shopping_list_id) => {
    return await sql`SELECT * FROM shopping_list_items WHERE shopping_list_id = ${shopping_list_id} ORDER BY collected, name`;
  };

  const updateItemById = async (item_id, name) => {
    try {
      console.log("Received data in updateItemById:", item_id, name);
  
      // Your existing update logic
      await sql`UPDATE shopping_list_items
        SET collected = TRUE WHERE id = ${item_id}`;
    } catch (error) {
      console.error("Error in updateItemById:", error);
      throw error;
    }
  };

const updateItemByListId = async (shopping_list_id) => {
  await sql`UPDATE shopping_list_items SET collected = TRUE WHERE shopping_list_id = ${ shopping_list_id }`;
};

export { createItem, findAllByShoppingListId, updateItemById, getCollectedItemByListId, updateItemByListId, getItemNum };
