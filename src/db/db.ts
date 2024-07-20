import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const client = postgres({
  host: "192.168.88.200",
  port: 5432,
  username: "postgres",
  database: "delegations",
});

const db = drizzle(client);

export default db;
