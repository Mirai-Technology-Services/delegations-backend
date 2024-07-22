import jwt from "@elysiajs/jwt";
import { env } from "../env";
import { error } from "elysia";

// Define the type for the expected token data
export type TokenData = {
  id: string;
  email: string;
};

export const authenticateJWT = jwt({
  name: "jwt",
  secret: env.jwtSecret,
  exp: "7d",
});

export const jwtMiddleware = {
  async beforeHandle({ jwt, cookie }: any) {
    const token = cookie.auth?.value;

    if (!token) {
      return error(401, { message: "No token provided" });
    }

    try {
      const user = (await jwt.verify(token)) as TokenData;

      // Validate token data structure
      if (!user.id || !user.email) {
        return error(403, { message: "Invalid token data" });
      }
    } catch (err) {
      console.log(err);
      return error(403, { message: "Failed to authenticate token" });
    }
  },
};
