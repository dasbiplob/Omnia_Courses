import { sql } from "../database/database.js";

const updateById = async (id) => {
  await sql`UPDATE shopping_lists SET active=FALSE WHERE id = ${ id }`;
};

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const getListNum = async () => {
  let result = await executeQuery("SELECT COUNT(id) FROM shopping_lists;")
  return result.rows[0].count
};

/** Find all the shopping_lists entry that is active in the database */
const getAllLists = async () => {
    return await sql`SELECT * FROM shopping_lists where active = true`;
  };

  const findById = async (id) => {
    const rows = await sql`SELECT * FROM shopping_lists WHERE id = ${ id }`;
  
    if (rows && rows.length > 0) {
      return rows[0];
    }
  
    return { id: 0, name: "Unknown" };
  };  
  
  export { create, getAllLists, findById, updateById, getListNum };