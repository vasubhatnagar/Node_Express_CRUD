import express  from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { createTask, deleteTask, getMyTasks, updateTask } from "../controllers/task.js";
const router = express.Router();

router.post("/new", isAuthenticated, createTask);
router.get("/my", isAuthenticated, getMyTasks);
router.route("/:id").delete(isAuthenticated,deleteTask).put(isAuthenticated,updateTask);
export default router;