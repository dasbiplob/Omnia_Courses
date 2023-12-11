import { assertEquals } from "https://deno.land/std@0.202.0/testing/asserts.ts";
import { getHello } from "../../services/helloService.js";

Deno.test("Calling 'getHello()' returns 'Oh, hello there!'", async () => {
  assertEquals("Oh, hello there!", getHello());
});
