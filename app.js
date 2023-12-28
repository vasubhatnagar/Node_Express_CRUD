import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import taskRoutes from "./routes/task.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
export const app = express();
config({
    path:"./data/config.env"
});
//useind middlewares
app.use(express.json());
app.use(cookieParser()) 
//using routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/task", taskRoutes);


app.get("/", (req, res) => {
  res.send("Route working");
});


