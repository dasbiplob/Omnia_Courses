import postgres from "https://deno.land/x/postgresjs@v3.3.3/mod.js";

const sql = postgres({});

const create = async (name, address) => {
  await sql`INSERT INTO addresses (name, address)
    VALUES (${ name }, ${ address })`;
};

const findAll = async () => {
  return await sql`SELECT * FROM addresses`;
};

const findByNameOrAddressLike = async (nameOrAddress) => {
    const likePart = `%${nameOrAddress}%`;
  
    return await sql`SELECT * FROM addresses
      WHERE name ILIKE ${ namePart } OR address ILIKE ${ namePart }`;
  };
  

export { create, findAll, findByNameOrAddressLike };
