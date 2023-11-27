import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as itemService from "../services/itemService.js";
import * as listService from "../services/listService.js";
import * as requestUtils from "../utils/requestUtils.js";


const responseDetails = {
  headers: {"Content-Type": "text/html;charset=UTF-8"},
};

const add_shopping_list_items = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  // console.log(name)
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  // console.log(urlParts)
  await itemService.create(urlParts[2], name);
  
  return requestUtils.redirectTo(`/lists/${urlParts[2]}`)
}

const view_shopping_list_items = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  
  const data = {
      singleList : await listService.findById(urlParts[2]),
      items: await itemService.findAllItems(urlParts[2]),
  };
   console.log(data)
  // console.log('hello')
  return new Response(await renderFile("list.eta", data), responseDetails)
};

const markCollectedById = async (request) => {
  const url = new URL(request.url);
  
  const urlParts = url.pathname.split("/");
  // console.log('hello')

  await itemService.updateCollected(urlParts[4]);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`)
}



export {add_shopping_list_items, view_shopping_list_items, markCollectedById};
