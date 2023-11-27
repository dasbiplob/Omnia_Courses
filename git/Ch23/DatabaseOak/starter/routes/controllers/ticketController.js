import * as ticketService from "../../services/ticketService.js";

const listTickets = async ({ render }) => {
  const data = {
    tickets: await ticketService.findAll(),
  };

  render("index.eta", data);
};

const addTicket = async ({ request, response }) => {
  const body = request.body();
  const params = await body.value;
  const content = params.get("content");

  await ticketService.add(content);

  response.redirect("/tickets");
};

const resolveTicket = async ({ params, response }) => {
  await ticketService.resolve(params.id);

  response.redirect("/tickets");
};

const deleteTicket = async ({ params, response }) => {
  try {
    await ticketService.deleteTicket(params.id);
    response.redirect("/tickets");
  } catch (error) {
    console.error(error);
    response.status = 500;
    response.body = "Internal Server Error";
  }
};

export { addTicket, listTickets, resolveTicket, deleteTicket};
