import {
  addShoppingList,
  addShoppingListItems,
  collectShoppingListItem,
  deactiveShoppingList,
  showShoppingList,
  showShoppingLists,
} from "./controllers/listController.js";
import { showMain } from "./controllers/mainController.js";
import { serve } from "./deps.js";
import { configure } from "./deps.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

export const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      Location: path,
    },
  });
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");

  if (request.method === "POST") {
    if (url.pathname.endsWith("/deactivate")) {
      const listId = parts[2];
      return await deactiveShoppingList(listId);
    } else if (url.pathname.endsWith("/collect")) {
      const listId = parts[2];
      const itemId = parts[4];
      return await collectShoppingListItem(listId, itemId);
    } else if (url.pathname.startsWith("/lists") && parts.length === 2) {
      return await addShoppingList(request);
    } else if (url.pathname.startsWith("/lists") && parts.length === 4) {
      const listId = parts[2];
      return await addShoppingListItems(request, listId);
    }
  } else if (request.method === "GET") {
    if (url.pathname.startsWith("/lists") && parts.length === 3) {
      const listId = parts[2];
      return await showShoppingList(listId);
    } else if (url.pathname.startsWith("/lists") && parts.length === 2) {
      return await showShoppingLists();
    } else {
      return showMain();
    }
  }
};

serve(handleRequest, { port: 7777 });
