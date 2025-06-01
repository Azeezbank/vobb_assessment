// test register route with jest unit testing
import request from "supertest";
import app from "../index";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL_TEST!); // Use test DB
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("POST /api/auth/register", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "bankoleazeezb@gmail.com",
        password: "password123",
      })
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
  }, 1000);
});
