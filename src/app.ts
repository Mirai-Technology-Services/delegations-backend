import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { api } from "./api";
import { logger } from "./logger";

export const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(logger({ logResponse: true, logRequest: true, includeTimestamp: true }))
  .get("/", () => {
    return "Server is running!";
  })
  .use(api);
