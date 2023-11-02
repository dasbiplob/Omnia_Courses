import { serve } from "./deps.js";

const handleRequest = async (request) => {
  console.log("Responding with Hello world!");
  return new Response("Hello world!");
};

serve(handleRequest, { port: 7777 });
