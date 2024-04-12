import { Prisma } from "@prisma/client";
import { Response } from "express";
import { ZodError } from "zod";

export function handleErrorResponse(error: unknown, res: Response): void {
  if (error instanceof ZodError) {
    res
      .status(400)
      .json({ message: error.issues.map((issue) => issue.message).join(", ") });
  } else if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  ) {
    res.status(400).json({ message: "Username already exists" });
  } else if (error instanceof Error) {
    res.status(500).json({ message: error.message });
  } else {
    res.status(500).json({ message: "An unknown error occurred" });
  }
}
