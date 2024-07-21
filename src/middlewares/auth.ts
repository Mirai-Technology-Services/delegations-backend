import jwt from "@elysiajs/jwt";
import { env } from "../env";

export const authenticateJWT = jwt({
  name: "jwt",
  secret: env.jwtSecret,
});
