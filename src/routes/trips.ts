import Elysia from "elysia";
import db from "../db/db";
import { stops_log, trips } from "../db/schema";
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
          .where(eq(trips.user_id, user.id)) // @ts-ignore
          .limit(10);

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
      .post("/start", async ({ store: { user }, request }) => {
        const newStop = await request.json();
        newStop.user_id = user.id;

        const [insertedStop] = await db
          .insert(stops_log)
          .values(newStop)
          .returning();

        return {
          body: insertedStop,
        };
      })
      .get("/start-form", ({ store: { user } }) => {
        return {
          user,
        };
      }),
  )
  .listen(3000);
