import { describe, it, expect } from "vitest";
import { register } from "../src/controllers/userController";
import { Request, Response } from "express";
import { vi } from "vitest";

describe("User Controller", () => {
  it("should register a user and return a token", async () => {
    const req = {
      body: {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      },
    } as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;

    await register(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ token: expect.any(String) })
    );
  });
});
