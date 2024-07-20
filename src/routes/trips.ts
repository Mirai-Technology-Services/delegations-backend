import Elysia from "elysia";
import db from "../db/db";
import { car_trips } from "../db/schema";

export const tripsRoutes = new Elysia({ prefix: "/trips" })
  .get("/", () => {
    return db.select().from(car_trips);
  })
  .post("/", async (ctx) => {
    const newTrip = await ctx.request.json();

    const [insertedTrip] = await db.insert(car_trips).values(newTrip);

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
