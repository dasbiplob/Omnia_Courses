import { serve } from "https://deno.land/std@0.202.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as listController from "./controllers/listController.js";
import * as itemController from "./controllers/itemController.js";
import * as mainController from "./controllers/mainController.js"
import * as requestUtils from "./utils/requestUtils.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);
  
  if (url.pathname === "/" && request.method === "GET") {
    return await mainController.getStatistics(request)  
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await listController.addList(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await listController.viewLists(request);
  }else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
    return await listController.viewList(request);
  }else if (url.pathname.match("tasks/[0-9]+/entries/[0-9]+") && request.method === "POST") {
    return await itemController.updateItem(request);
  }else if (url.pathname.match("lists/[0-9]+/items") && request.method === "POST") {
    return await itemController.createItem(request);
  }else if (url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST") {
    return await listController.updateLists(request)
}else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });
