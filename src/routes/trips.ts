import Elysia from "elysia";
import db from "../db/db";
import { car_trips } from "../db/schema";
import { eq } from "drizzle-orm";
import { TokenData, authenticateJWT, jwtMiddleware } from "../middlewares/auth";

export const tripsRoutes = new Elysia({ prefix: "/trips" })
  .state("user", {} as TokenData)
  .use(authenticateJWT)
  .guard(jwtMiddleware, (app) =>
    app
      .get("/", async ({ store: { user } }) => {
        const trips = await db
          .select()
          .from(car_trips)
          .where(eq(car_trips.user_id, user.id));

        return { body: trips };
      })
      .post("/", async ({ store, request }) => {
        const user = store.user;

        const newTrip = await request.json();
        newTrip.user_id = user.id;

        const [insertedTrip] = await db
          .insert(car_trips)
          .values(newTrip)
          .returning();

        return {
          body: insertedTrip,
        };
      })
      .get("/start-form", () => {
        return {
          delegation_id: "test",
          start_time: "2021-01-01T00:00:00Z",
        };
      }),
  )
  .listen(3000);
