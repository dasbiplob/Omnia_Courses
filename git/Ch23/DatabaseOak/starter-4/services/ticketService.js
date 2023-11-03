import { sql } from "../database/database.js";

const findAll = async () => {
  return await sql`SELECT * FROM tickets`;
};

const add = async (content) => {
  await sql`INSERT INTO tickets (content, reported_on)
    VALUES (${ content }, NOW())`;
};

const resolve = async (ticketId) => {
  await sql`UPDATE tickets SET resolved_on = NOW()
    WHERE id = ${ ticketId }`;
};

const deleteTicket = async (ticketId) => {
  await sql`DELETE FROM tickets WHERE id = ${ ticketId }`;
};

export { add, findAll, resolve, deleteTicket };
