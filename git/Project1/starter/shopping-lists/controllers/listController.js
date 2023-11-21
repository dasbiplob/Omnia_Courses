import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

/** Process the request POST /lists */
const addList = async (request) => {
  // Get the data sent in the form
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.create(name);

  return requestUtils.redirectTo("/lists");
};
/** Process the request GET /lists */
const viewLists = async (request) => {
  const data = {
    lists: await listService.getAllLists(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};
/** Process the request GET /lists/id */
const viewList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const data = {
    list: await listService.findById(urlParts[2]),
    items: await itemService.findAllByShoppingListId(urlParts[2]),
    items_collected : await itemService.getCollectedItemByListId(urlParts[2])
  };

  return new Response(await renderFile("list.eta", data), responseDetails);
};

/** Process the request POST /lists/id */
const updateLists = async (request) => {
  // Get the id
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  let id = urlParts[2]

  // Update by id
  await listService.updateById(id)

  return requestUtils.redirectTo("/lists")
}
export { addList, viewLists, viewList, updateLists };
