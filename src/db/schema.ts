import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
  boolean,
  date,
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
  password: varchar("password", { length: 255 }).notNull(),
  organisation_id: integer("organisation_id").references(
    () => organisations.organisation_id,
  ),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

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

export const car_trips = pgTable("car_trips", {
  trip_id: serial("trip_id").primaryKey(),
  delegation_id: integer("delegation_id").notNull(),
  trip_type: varchar("trip_type", { length: 50 }).notNull(),
  start_time: date("start_time").notNull(),
  end_time: date("end_time").notNull(),
  start_location: varchar("start_location", { length: 255 }).notNull(),
  end_location: varchar("end_location", { length: 255 }).notNull(),
  trip_description: varchar("trip_description", { length: 255 }),
  meter_start: integer("meter_start").notNull(),
  meter_end: integer("meter_end").notNull(),
  car_id: integer("car_id")
    .references(() => cars.car_id)
    .notNull(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.user_id),
  remarks: varchar("remarks", { length: 255 }),
  last_updated: date("last_updated").defaultNow().notNull(),
});

export const car_delegations = pgTable("car_delegations", {
  delegation_id: serial("delegation_id").primaryKey(),
  delegation_date: date("delegation_date").notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  diet_count: integer("diet_count").notNull(),
  status: boolean("status").default(false).notNull(),
});
