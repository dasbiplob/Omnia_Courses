import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: {"Content-Type": "text/html;charset=UTF-8"},
};

const add_shopping_list = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  // console.log(name)
  await listService.create(name);
  return requestUtils.redirectTo("/lists")
}

const view_shopping_lists = async (request) => {
  const data = {
      shopping_lists: await listService.findAllActiveShopping_lists(),
  }
  return new Response(await renderFile("lists.eta", data), responseDetails)
};

const deactivateLists = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await listService.deactivateById(urlParts[2]);
  return requestUtils.redirectTo("/lists")
}

const mainPage = async (request) => {
  const data = {
    shoppingLists: await listService.countShoppingLists(),
    shoppingListItems: await listService.countShoppingListsItems()
  };
  console.log(data)
  return new Response(await renderFile("index.eta", data), responseDetails);
}

export { add_shopping_list, view_shopping_lists, deactivateLists, mainPage};
