import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};


const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await listService.create(name);

  return requestUtils.redirectTo("/lists");
};

const viewLists = async (request) => {
  const data = {
    lists: await listService.getAllLists(),
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

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

export { addList, viewLists, viewList };
