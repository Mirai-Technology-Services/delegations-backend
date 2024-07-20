import Elysia from "elysia";
import db from "../db/db";
import { organisations } from "../db/schema";

export const organisationsRoutes = new Elysia({ prefix: "/organisations" }).get(
  "/",
  () => {
    return db.select().from(organisations);
  },
);
