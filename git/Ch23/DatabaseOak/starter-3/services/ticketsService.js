import { sql } from "../database/database.js";

const findAll = async () => {
  return await sql`SELECT * FROM tickets`;
};

const resolveTicket = async (ticketId) => {
  await sql`UPDATE tickets SET resolved_on=NOW() WHERE id = ${ticketId}`;
};

export { findAll, resolveTicket };
