import { sql } from "../database/database.js";

const lastUploadedId = async () => {
  const rows = await sql`SELECT MAX(id) as max_id FROM miniupload_files`;
  if (rows && rows.length == 1) {
    return rows[0].max_id;
  } else {
    return -1;
  }
};

export { lastUploadedId };
