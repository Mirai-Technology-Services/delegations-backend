import Elysia from "elysia";
import { organisationsRoutes } from "./routes/organisations";

export const api = new Elysia({
  prefix: "/api",
}).use(organisationsRoutes);
