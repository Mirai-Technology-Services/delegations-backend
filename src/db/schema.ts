import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const organisations = pgTable("organisations", {
  organisation_id: serial("organisation_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const users = pgTable("users", {
  user_id: serial("user_id").primaryKey(),
  first_name: varchar("first_name", { length: 50 }).notNull(),
  last_name: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  organisation_id: integer("organisation_id")
    .references(() => organisations.organisation_id)
    .notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
