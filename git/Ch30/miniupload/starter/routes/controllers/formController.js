import { lastUploadedId } from "../../services/fileService.js";

const viewForm = async ({ render }) => {
  const lastId = await lastUploadedId();
  render("index.eta", {
    last_id: lastId,
  });
};

export { viewForm };
