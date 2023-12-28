import express from "express";
const router = express.Router();
import { User } from "../models/user.js";
import { getMyProfile, login, logout, registerUser } from "../controllers/user.js";
import { isAuthenticated } from "../middleware/auth.js";

router.post("/login", login);

router.get("/me",isAuthenticated, getMyProfile);

router.post("/new", registerUser);

router.get("/logout",isAuthenticated, logout);

export default router;