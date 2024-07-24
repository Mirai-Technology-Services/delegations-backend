import Elysia from "elysia";
import db from "../db/db";
import { eq } from "drizzle-orm";
import { stops_log, trips } from "../db/schema";
import { jwtValidation } from "../middlewares/auth";

export const tripsRoutes = new Elysia({ prefix: "/trips" })
  .use(jwtValidation)
  .get("/", async ({ user }) => {
    const dbTrips = await db
      .select()
      .from(trips)
      .where(eq(trips.user_id, user.id))
      .limit(10);

    return { body: dbTrips };
  })
  .post("/", async ({ user, request }) => {
    const newTrip = await request.json();
    newTrip.user_id = user.id;

    const [insertedTrip] = await db.insert(trips).values(newTrip).returning();

    return {
      body: insertedTrip,
    };
  })
  .post("/start", async ({ user, request }) => {
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
  .get("/start-form", ({ user }) => {
    return {
      user,
    };
  });
