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

    res.status(201).json(user);
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

const updateProfileIconSchema = z.object({
  id: z.number(),
  profile_icon: z.string(),
});
export const updateProfileIcon = async (req: Request, res: Response) => {
  try {
    const iconInput = updateProfileIconSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { id: iconInput.id },
    });

    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const user = await prisma.user.update({
      where: { id: iconInput.id },
      data: { profile_icon: iconInput.profile_icon },
    });

    res.json(user);
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

const updateFavoritesSchema = z.object({
  id: z.number(),
  favorite: z.string(),
});
export const updateFavorites = async (req: Request, res: Response) => {
  try {
    const favoriteInput = updateFavoritesSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({
      where: { id: favoriteInput.id },
    });

    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    let updatedFavorites: string[];
    if (existingUser.favorites.includes(favoriteInput.favorite)) {
      updatedFavorites = existingUser.favorites.filter(
        (favorite) => favorite !== favoriteInput.favorite
      );
    } else {
      updatedFavorites = [...existingUser.favorites, favoriteInput.favorite];
    }

    const user = await prisma.user.update({
      where: { id: favoriteInput.id },
      data: { favorites: updatedFavorites },
    });

    res.json(user);
  } catch (error) {
    handleErrorResponse(error, res);
  }
};
