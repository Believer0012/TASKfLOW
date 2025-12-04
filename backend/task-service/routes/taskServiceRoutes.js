import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../controller/taskServiseController.js";

const router = express.Router();

router.post("/createTask", createTask);
router.get("/getTask", getTasks);
router.put("/updateTasks/:id", updateTask);
router.delete("/deleteTasks/:id", deleteTask);

export default router;
