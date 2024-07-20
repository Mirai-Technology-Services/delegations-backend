import jwt from "@elysiajs/jwt";
import Elysia from "elysia";
import { users } from "../db/schema";
import db from "../db/db";
import { eq } from "drizzle-orm";

const secretKey = "Fischl von Luftschloss Narfidort"; // Replace with your secret key

export const authRoutes = new Elysia({ prefix: "/auth" })
  .use(jwt({ secret: secretKey }))
  .post("/register", async (ctx) => {
    const { first_name, last_name, email, password } = await ctx.request.json();
    console.log(first_name, last_name, email, password);

    const hashedPassword = await Bun.password.hash(password);

    const [newUser] = await db
      .insert(users)
      .values({
        first_name,
        email,
        last_name,
        password: hashedPassword,
      })
      .returning();

    return { id: newUser.user_id, email: newUser.email };
  })
  .post("/login", async (ctx) => {
    const { email, password } = await ctx.request.json();

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return { status: 401, body: "User does not exists" };
    }

    const passwordMatch = await Bun.password.verify(password, user.password);

    if (!passwordMatch) {
      return { status: 401, body: "Invalid password" };
    }

    const token = await ctx.jwt.sign({ id: user.user_id, email: user.email });

    ctx.cookie.auth.set({
      value: token,
      httpOnly: true,
      maxAge: 7 * 86400,
      path: "/",
    });

    return { message: "Login successful" };
  });
