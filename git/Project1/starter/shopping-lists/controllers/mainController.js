import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as listService from "../services/listService.js";
import * as itemService from "../services/itemService.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
  };

  /** Count Statistics */
const getStatistics = async (request) => {
    const data = {
        lists_num: await listService.getListNum(),
        items_num: await itemService.getItemNum(),
    }
    return new Response(await renderFile("index.eta", data), responseDetails);
}

export { getStatistics }
