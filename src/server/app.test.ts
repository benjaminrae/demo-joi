import request from "supertest";
import app from "./app";
import httpStatusCodes from "../utils/httpStatusCodes";

const {
  clientErrors: { notFoundCode },
} = httpStatusCodes;

describe("Given a GET / endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 200 and message 'Pong 🏓'", async () => {
      const expectedStatus = 200;
      const expectedMessage = "Pong 🏓";

      const response = await request(app).get("/").expect(expectedStatus);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});

describe("Given a GET /not-found endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 404 and 'Unknown endpoint'", async () => {
      const unknownEndpoint = "/not-found";
      const expectedError = "Unknown endpoint";

      const response = await request(app)
        .get(unknownEndpoint)
        .expect(notFoundCode);

      expect(response.body).toHaveProperty("error", expectedError);
    });
  });
});
