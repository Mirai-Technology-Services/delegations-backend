import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

// Organisations Table
export const organisations = pgTable("organisations", {
  organisation_id: serial("organisation_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

// Users Table
export const users = pgTable("users", {
  user_id: serial("user_id").primaryKey(),
  first_name: varchar("first_name", { length: 50 }).notNull(),
  last_name: varchar("last_name", { length: 50 }).notNull(),
  email: varchar("email", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  organisation_id: integer("organisation_id").references(
    () => organisations.organisation_id,
  ),
  created_at: timestamp("created_at", { mode: "string" })
    .defaultNow()
    .notNull(),
});

// Cars Table
export const cars = pgTable("cars", {
  car_id: serial("car_id").primaryKey(),
  license_plate: varchar("license_plate", { length: 20 }).notNull().unique(),
  model: varchar("model", { length: 255 }).notNull(),
  user_id: integer("user_id")
    .references(() => users.user_id)
    .notNull(),
  organisation_id: integer("organisation_id")
    .references(() => organisations.organisation_id)
    .notNull(),
});

// Delegations Table
export const delegations = pgTable("delegations", {
  user_id: integer("user_id")
    .references(() => users.user_id)
    .notNull(),
  delegation_id: serial("delegation_id").primaryKey(),
  description: varchar("description", { length: 255 }),
  diet_count: integer("diet_count"),
  status: varchar("status", { length: 50 }).default("active").notNull(),
});

// Trips Table
export const trips = pgTable("trips", {
  trip_id: serial("trip_id").primaryKey(),
  delegation_id: integer("delegation_id")
    .references(() => delegations.delegation_id)
    .notNull(),
  trip_type: varchar("trip_type", { length: 50 }).notNull(),
  start_time: timestamp("start_time", { mode: "string" }).notNull(),
  end_time: timestamp("end_time", { mode: "string" }).notNull(),
  start_location: varchar("start_location", { length: 255 }).notNull(),
  end_location: varchar("end_location", { length: 255 }).notNull(),
  trip_description: varchar("trip_description", { length: 255 }),
  meter_start: integer("meter_start").notNull(),
  meter_end: integer("meter_end").notNull(),
  car_id: integer("car_id")
    .references(() => cars.car_id)
    .notNull(),
  user_id: integer("user_id")
    .references(() => users.user_id)
    .notNull(),
  remarks: varchar("remarks", { length: 255 }),
  last_updated: timestamp("last_updated", { mode: "string" })
    .defaultNow()
    .notNull(),
});

// Stops Log Table
export const stops_log = pgTable("stops_log", {
  id: serial("id").primaryKey(),
  delegation_id: integer("delegation_id")
    .references(() => delegations.delegation_id)
    .notNull(),
  user_id: integer("user_id")
    .references(() => users.user_id)
    .notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  meter: integer("meter").notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  time: timestamp("time", { mode: "string" }).defaultNow().notNull(),
});
