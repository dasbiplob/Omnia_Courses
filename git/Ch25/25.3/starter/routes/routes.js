import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import * as accountController from "./controllers/accountController.js";
import * as mainController from "./controllers/mainController.js";
import * as accountController from "./controllers/accountController.js"; // Add this line

const router = new Router();

router.get("/", mainController.showMain);

router.get("/auth/register", authenticationController.showRegistrationForm);
router.post("/auth/register", authenticationController.postRegistrationForm);
router.get("/auth/login", authenticationController.showLoginForm);
router.post("/auth/login", authenticationController.postLoginForm);

// Apply authentication middleware to the routes that require authentication
router.get("/accounts", authenticationController.authenticationMiddleware, accountController.showAccounts);
router.post("/accounts", authenticationController.authenticationMiddleware, accountController.createAccount);

export { router };
