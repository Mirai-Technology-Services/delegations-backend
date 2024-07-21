import Elysia from "elysia";
import db from "../db/db";
import { car_trips } from "../db/schema";
import { authenticateJWT } from "../middlewares/auth";
import { eq } from "drizzle-orm";
import JWTPayload from "../types";

export const tripsRoutes = new Elysia({ prefix: "/trips" })
  .use(authenticateJWT)
  .get("/", async ({ jwt, cookie }) => {
    console.log(await Bun.password.hash("password"));
    const token = cookie.auth.value;
    const user = (await jwt.verify(token)) as unknown as JWTPayload;

    return db.select().from(car_trips).where(eq(car_trips.user_id, user.id));
  })
  .post("/", async ({ jwt, cookie, request }) => {
    const token = cookie.auth.value;
    const user = (await jwt.verify(token)) as unknown as JWTPayload;

    const newTrip = await request.json();
    newTrip.user_id = user.id;

    const [insertedTrip] = await db
      .insert(car_trips)
      .values(newTrip)
      .returning();

    return {
      status: 201,
      body: insertedTrip,
    };
  })
  .get("/start-form", () => {
    return {
      delegation_id: "test",
      start_time: "2021-01-01T00:00:00Z",
    };
  });
