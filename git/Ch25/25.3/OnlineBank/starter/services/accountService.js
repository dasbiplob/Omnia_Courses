import { sql } from "../database/database.js";

const addAccount = async (name, userId) => {
  await sql`INSERT INTO accounts (name, user_id) VALUES (${ name }, ${ userId })`;
};

const findAccountsForUser = async (userId) => {
  return await sql`SELECT * FROM accounts WHERE user_id = ${ userId }`;
};

export { addAccount, findAccountsForUser };
