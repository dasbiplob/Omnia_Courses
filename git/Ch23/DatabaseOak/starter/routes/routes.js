import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import * as ticketController from "./controllers/ticketController.js";

const router = new Router();

router.get("/tickets", ticketController.listTickets);
router.post("/tickets", ticketController.addTicket);
router.post("/tickets/:id/resolve", ticketController.resolveTicket);
router.post("/tickets/:id/delete", ticketController.deleteTicket);

export { router };
