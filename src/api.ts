import Elysia from "elysia";
import { organisationsRoutes } from "./routes/organisations";
import { tripsRoutes } from "./routes/trips";
import { authRoutes } from "./routes/auth";

export const api = new Elysia({
  prefix: "/api",
})
  .use(authRoutes)
  .use(organisationsRoutes)
  .use(tripsRoutes);
