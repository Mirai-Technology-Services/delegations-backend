import jwt from "@elysiajs/jwt";
import { env } from "../env";
import Elysia, { error } from "elysia";

export type TokenData = {
  id: number;
  email: string;
};

export const jwtConfig = jwt({
  name: "jwt",
  secret: env.jwtSecret,
  exp: "7d",
});

export const jwtValidation = (app: Elysia) =>
  app
    .use(jwtConfig)
    .onBeforeHandle(async ({ cookie }) => {
      if (!cookie.auth?.value) {
        return error(401, { message: "No token provided" });
      }
    })
    .derive(async ({ jwt, cookie }) => {
      const token = cookie.auth.value;
      const user = (await jwt.verify(token)) as TokenData;
      return { user };
    });
