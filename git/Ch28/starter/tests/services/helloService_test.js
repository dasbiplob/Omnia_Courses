import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import app from "../../app.js";

Deno.test("GET /api/hello should return the default message", async () => {
  const request = await superoak(app);
  await request.get("/api/hello").expect(200).expect({ message: "Oh, hello there!" });
});

Deno.test("POST /api/hello with valid message should set and return the message", async () => {
  const request = await superoak(app);
  const newMessage = "Testing Superoak!";
  await request.post("/api/hello").send({ message: newMessage }).expect(200).expect({ message: `Message set to: ${newMessage}` });
});

Deno.test("POST /api/hello with an empty message should not change the message", async () => {
  const request = await superoak(app);
  await request.post("/api/hello").send({ message: "" }).expect(200).expect({ message: "Oh, hello there!" });
});

Deno.test("POST /api/hello with a message longer than 10 characters should not change the message", async () => {
  const request = await superoak(app);
  const newMessage = "TooLongMessage";
  await request.post("/api/hello").send({ message: newMessage }).expect(200).expect({ message: "Oh, hello there!" });
});

Deno.test("POST /api/hello without a message should not change the message", async () => {
  const request = await superoak(app);
  await request.post("/api/hello").send({}).expect(200).expect({ message: "Oh, hello there!" });
});
