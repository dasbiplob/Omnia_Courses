import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

/** Process request to /lists/{id}/items */
const createItem = async (request) => {
    // Get id
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  let id = urlParts[2]

  // Get items name
  const formData = await request.formData()
  const name = formData.get("name")

  await itemService.createItem(id, name)

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

/** Process request to /lists/{id}/items/{item_id} */
const updateItem = async (request) => {
    // Get list id and item id
    const url = new URL(request.url)
    const urlParts = url.pathname.split("/")


    await itemService.updateItemById(urlParts[4])
    return requestUtils.redirectTo(`/lists/${urlParts[2]}`)
}

export { createItem, updateItem };
