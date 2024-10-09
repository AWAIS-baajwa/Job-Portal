import express from "express";
import cors from "cors";
export const app = express();
import cookieParser from "cookie-parser";
import { router } from "./ROUTES/testRoute.js";
import userRoute from "./ROUTES/userRouter.js";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use("/test", router);

app.use("/user", userRoute);
