import Elysia from "elysia";
import db from "../db/db";
import { and, eq } from "drizzle-orm";
import { delegations, stops_log, trips } from "../db/schema";
import { jwtValidation } from "../middlewares/auth";

export const tripsRoutes = new Elysia({ prefix: "/trips" })
  .use(jwtValidation)
  .get(
    "/",
    async ({ user }) => {
      const dbTrips = await db
        .select()
        .from(trips)
        .where(eq(trips.user_id, user.id))
        .limit(10);

      return { body: dbTrips };
    },
    { requireAuth: true },
  )
  .post(
    "/start",
    async ({ user, request }) => {
      const newStop = await request.json();
      newStop.user_id = user.id;

      const [insertedStop] = await db
        .insert(stops_log)
        .values(newStop)
        .returning();

      return {
        body: insertedStop,
      };
    },
    { requireAuth: true },
  )
  .get(
    "/start-form",
    ({ user }) => {
      return {
        user,
      };
    },
    { requireAuth: true },
  )
  .get(
    "/dashboard",
    async ({ user }) => {
      // Fetch the active delegation for the user
      const [activeDelegation] = await db
        .select()
        .from(delegations)
        .where(
          and(
            eq(delegations.user_id, user.id),
            eq(delegations.status, "active"),
          ),
        );

      // If no active delegation is found, return the appropriate response
      if (!activeDelegation) {
        return {
          message: "No active delegations found",
          body: {
            hasActiveDelegation: false,
            hasActiveTrip: false,
            activeDelegation: null,
          },
        };
      }

      // Fetch all trips associated with the active delegation
      const delegationTrips = await db
        .select()
        .from(trips)
        .where(eq(trips.delegation_id, activeDelegation.delegation_id));

      // Check if there is any active trip in the list of trips
      const activeTrip = delegationTrips.find(
        (trip) => trip.status === "active",
      );

      // Return the response with delegation and trips information
      return {
        message: "Active delegations found",
        body: {
          hasActiveDelegation: true,
          hasActiveTrip: !!activeTrip,
          activeDelegation: {
            ...activeDelegation,
            trips: delegationTrips,
          },
        },
      };
    },
    { requireAuth: true },
  );
