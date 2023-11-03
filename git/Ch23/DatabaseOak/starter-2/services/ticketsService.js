import { sql } from "../database/database.js";

const findAll = async () => {
  return await sql`SELECT id, content FROM tickets`;
};

export { findAll };
