import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";

import { handleErrorResponse } from "@/utils/handleErrorResponse";

const prisma = new PrismaClient();

const registerUserSchema = z.object({
  username: z.string().min(3).max(30).trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
    )
    .trim(),
});
export const register = async (req: Request, res: Response) => {
  try {
    const userInput = registerUserSchema.parse(req.body);

    const user = await prisma.user.create({
      data: {
        username: userInput.username,
        password: userInput.password,
        favorites: [],
      },
    });

    res.json(user);
  } catch (error) {
    handleErrorResponse(error, res);
  }
};
