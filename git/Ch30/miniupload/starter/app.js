import { Application } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { renderMiddleware } from "./middlewares/renderMiddleware.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import * as base64 from "https://deno.land/x/base64@v0.2.1/mod.ts";
import { sql } from "./database/database.js";

import { router } from "./routes/routes.js";

const app = new Application();

// Add middlewares
app.use(errorMiddleware);
app.use(renderMiddleware);

// Define the function to show the file upload form
const showForm = ({ render }) => {
  render("index.eta");
};

// Define the function to process file upload
const processUpload = async ({ request, response }) => {
  const body = request.body({ type: "form-data" });
  const reader = await body.value;
  const data = await reader.read();

  const fileDetails = data.files[0];

  // Reading and encoding the file content
  const fileContents = await Deno.readAll(
    await Deno.open(fileDetails.filename),
  );
  const base64Encoded = base64.fromUint8Array(fileContents);

  // Generate a random password using the given approach
  const password = `${Math.floor(100000 * Math.random())}`;

  // Hash the generated password using bcrypt
  const hashedPassword = await bcrypt.hash(password);

  // Store file details in the database along with the hashed password
  await sql`INSERT INTO miniupload_files (name, type, data, password)
    VALUES (${fileDetails.originalName}, ${fileDetails.contentType}, ${base64Encoded}, ${hashedPassword})`;

  // Respond with the generated password
  response.body = password; // Changed to respond with just the password
};

// Define the function to retrieve a file
const getFile = async ({ request, response }) => {
  // Extract id and password from the request body
  const body = request.body({ type: "form" });
  const formData = await body.value;
  const id = formData.get("id");
  const password = formData.get("password");

  if (!id || !password) {
    response.status = 401;
    response.body = "Unauthorized";
    return;
  }

  // Retrieve file details from the database using the id
  const files = await sql`SELECT * FROM miniupload_files WHERE id = ${id}`;
  const file = files[0];

  if (!file) {
    response.status = 401;
    response.body = "File not found or unauthorized access";
    return;
  }

  // Verify if the provided password matches the stored hashed password
  const passwordMatch = await bcrypt.compare(password, file.password);

  if (passwordMatch) {
    // If passwords match, set appropriate headers and send the file content
    response.headers.set("Content-Type", file.type);
    const arr = base64.toUint8Array(file.data);
    response.headers.set("Content-Length", arr.length);
    response.body = arr;
  } else {
    // If passwords don't match, return 401 Unauthorized status
    response.status = 401;
    response.body = "Unauthorized";
  }
};


// Attach routes
router.get("/", showForm)
  .post("/", processUpload)
  .post("/files", getFile); // Changed the route path to "/files" to handle POST requests without an id

app.use(router.routes());

// Start the server
app.listen({ port: 7777 });
