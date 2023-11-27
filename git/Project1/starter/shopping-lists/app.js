import { configure, serve } from "./deps.js";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if(url.pathname === "/" && request.method === "GET"){
    return await listController.mainPage(request);

  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.add_shopping_list(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.view_shopping_lists(request);

  } else if (url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST") {
    return await listController.deactivateLists(request);

  }  else if (url.pathname.match("/lists/[0-9]+") && request.method === "GET") {
    return await itemController.view_shopping_list_items(request);

  } else if (url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
    return await itemController.markCollectedById(request);

  } else if (url.pathname.match("/lists/[0-9]+/items") && request.method === "POST") {
    return await itemController.add_shopping_list_items(request);
    
  } else {
    return new Response ("NOT FOUND", {status: 404});
  }
  
};

serve(handleRequest, { port: 7777 });
