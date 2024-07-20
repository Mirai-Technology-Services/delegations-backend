import Elysia from "elysia";
import { organisationsRoutes } from "./routes/organisations";
import { tripsRoutes } from "./routes/trips";

export const api = new Elysia({
  prefix: "/api",
})
  .use(organisationsRoutes)
  .use(tripsRoutes);
