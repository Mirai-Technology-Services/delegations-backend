import { afterAll, beforeAll, describe, expect, it } from "bun:test";
import { app } from "../src";
import db from "../src/db/db";
import { users } from "../src/db/schema";
import { eq } from "drizzle-orm";

beforeAll(async () => {
  // Start the server
});

afterAll(async () => {
  // Stop the server
});

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const response = await app
      .handle(
        new Request("http://localhost/api/auth/register/", {
          method: "POST",
          body: JSON.stringify({
            first_name: "John",
            last_name: "Doe",
            email: "john.doe@example.com",
            password: "password123",
          }),
          headers: { "Content-Type": "application/json" },
        }),
      )
      .then((res) => res.json());

    expect(response).toBe("john.doe@example.com");

    // Clean up
    await db.delete(users).where(eq(users.email, "john.doe@example.com"));
  });

  // it("should not register an existing user", async () => {
  //   // Insert a user for testing
  //   await db.insert(users).values({
  //     first_name: "Jane",
  //     last_name: "Doe",
  //     email: "jane.doe@example.com",
  //     password: await Bun.password.hash("password123"),
  //   });
  //
  //   const response = await app
  //     .handle(
  //       new Request("http://localhost/auth/register", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           first_name: "Jane",
  //           last_name: "Doe",
  //           email: "jane.doe@example.com",
  //           password: "password123",
  //         }),
  //         headers: { "Content-Type": "application/json" },
  //       }),
  //     )
  //     .then((res) => res.json());
  //
  //   expect(response.message).toBe("User already exists");
  //
  //   // Clean up
  //   await db.delete(users).where(eq(users.email, "jane.doe@example.com"));
  // });
  //
  // it("should login a user", async () => {
  //   // Insert a user for testing
  //   await db.insert(users).values({
  //     first_name: "Jane",
  //     last_name: "Doe",
  //     email: "jane.doe@example.com",
  //     password: await Bun.password.hash("password123"),
  //   });
  //
  //   const response = await app
  //     .handle(
  //       new Request("http://localhost/auth/login", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           email: "jane.doe@example.com",
  //           password: "password123",
  //         }),
  //         headers: { "Content-Type": "application/json" },
  //       }),
  //     )
  //     .then((res) => res.json());
  //
  //   expect(response.message).toBe("Login successful");
  //   expect(response.token).toBeDefined();
  //
  //   // Clean up
  //   await db.delete(users).where(eq(users.email, "jane.doe@example.com"));
  // });
  //
  // it("should not login a non-existent user", async () => {
  //   const response = await app
  //     .handle(
  //       new Request("http://localhost/auth/login", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           email: "nonexistent@example.com",
  //           password: "password123",
  //         }),
  //         headers: { "Content-Type": "application/json" },
  //       }),
  //     )
  //     .then((res) => res.json());
  //
  //   expect(response.message).toBe("User does not exist");
  // });
  //
  // it("should not login with incorrect password", async () => {
  //   // Insert a user for testing
  //   await db.insert(users).values({
  //     first_name: "Jane",
  //     last_name: "Doe",
  //     email: "jane.doe@example.com",
  //     password: await Bun.password.hash("password123"),
  //   });
  //
  //   const response = await app
  //     .handle(
  //       new Request("http://localhost/auth/login", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           email: "jane.doe@example.com",
  //           password: "wrongpassword",
  //         }),
  //         headers: { "Content-Type": "application/json" },
  //       }),
  //     )
  //     .then((res) => res.json());
  //
  //   expect(response.message).toBe("Invalid password");
  //
  //   // Clean up
  //   await db.delete(users).where(eq(users.email, "jane.doe@example.com"));
  // });
});
