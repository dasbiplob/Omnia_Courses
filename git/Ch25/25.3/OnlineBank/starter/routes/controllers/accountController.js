import * as accountService from "../../services/accountService.js";

const addAccount = async ({ request, response, state }) => {
  if (await state.session.get("authenticated")) {
    const user = await state.session.get("user");

    const body = request.body();
    const params = await body.value;

    const name = params.get("name");

    await accountService.addAccount(name, user.id);
    response.redirect("/accounts");
  } else {
    response.status = 401;
  }
};

const listAccounts = async ({ render, response, state }) => {
  if (await state.session.get("authenticated")) {
    const user = await state.session.get("user");
    const accounts = await accountService.findAccountsForUser(user.id);
    render("accounts.eta", { accounts: accounts });
  } else {
    response.status = 401;
  }
};

export { addAccount, listAccounts };
