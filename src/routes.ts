import express from "express";

import userRoutes from "./routes/userRoutes";

const router = express.Router();

router.use("/user", userRoutes);

export default router;
