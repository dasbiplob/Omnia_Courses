import {
  addList,
  deactivateList,
  getActiveLists,
  getList,
} from "../services/listService.js";
import { renderFile } from "../deps.js";
import {
  addItem,
  collecItem,
  getCollectedItems,
  getUncollectedItems,
} from "../services/itemService.js";
import { redirectTo } from "../app.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

export const showShoppingLists = async () => {
  const activeLists = await getActiveLists();

  const data = {
    activeLists,
  };

  return new Response(await renderFile("lists.eta", data), responseDetails);
};

export const addShoppingList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  await addList(name);
  return redirectTo("/lists");
};

export const showShoppingList = async (listId) => {
  const rows = await getList(listId);
  const list = rows[0];

  const uncollectedItems = await getUncollectedItems(listId);
  const collectedItems = await getCollectedItems(listId);

  const data = {
    ...list,
    uncollectedItems,
    collectedItems,
  };

  return new Response(await renderFile("list.eta", data), responseDetails);
};

export const deactiveShoppingList = async (listId) => {
  await deactivateList(listId);
  return redirectTo("/lists");
};

export const addShoppingListItems = async (request, listId) => {
  const formData = await request.formData();
  const name = formData.get("name");
  await addItem(listId, name);
  return redirectTo(`/lists/${listId}`);
};

export const collectShoppingListItem = async (listId, itemId) => {
  await collecItem(itemId);
  return redirectTo(`/lists/${listId}`);
};
