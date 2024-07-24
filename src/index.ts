import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import Elysia from "elysia";
import { api } from "./api";
import { logger } from "./logger";
import { env } from "./env";

export const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(logger({ includeTimestamp: true }))
  .get("/", () => {
    return "Server is running!";
  })
  .use(api)
  .listen(env.port);
