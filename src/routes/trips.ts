import Elysia from "elysia";
import db from "../db/db";
import { trips } from "../db/schema";
import { eq } from "drizzle-orm";
import { TokenData, authenticateJWT, jwtMiddleware } from "../middlewares/auth";

export const tripsRoutes = new Elysia({ prefix: "/trips" })
  .state("user", {} as TokenData)
  .use(authenticateJWT)
  .guard(jwtMiddleware, (app) =>
    app
      .get("/", async ({ store: { user } }) => {
        const dbTrips = await db
          .select()
          .from(trips)
          .where(eq(trips.user_id, user.id));

        return { body: dbTrips };
      })
      .post("/", async ({ store: { user }, request }) => {
        const newTrip = await request.json();
        newTrip.user_id = user.id;

        const [insertedTrip] = await db
          .insert(trips)
          .values(newTrip)
          .returning();

        return {
          body: insertedTrip,
        };
      })
      .get("/start-form", ({ store: { user } }) => {
        return {
          user,
        };
      }),
  )
  .listen(3000);
