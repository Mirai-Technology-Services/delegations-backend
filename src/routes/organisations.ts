import Elysia from "elysia";
import db from "../db/db";
import { organisations } from "../db/schema";
import { jwtValidation } from "../middlewares/auth";

export const organisationsRoutes = new Elysia({ prefix: "/organisations" })
  .use(jwtValidation)
  .get("/", () => {
    return db.select().from(organisations);
  });
