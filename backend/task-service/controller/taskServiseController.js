import Task from "../model/base/task.js";
import jwt from "jsonwebtoken";

// Create new task
export const createTask = async (req, res) => {
  try {
    const { title, description, due_date,userId } = req.body;

    console.log("Creating task for user:", req.body);

    const newTask = await Task.create({
      title,
      description,
      due_date,
      userId,
    });

    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating task" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Missing token" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "change-me");
    const userId = decoded.id;

    console.log("Fetching tasks for user:", userId);
    const tasks = await Task.findAll({ where: { userId } });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tasks" });
  }
};
// Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, due_date,userId } = req.body;

    const task = await Task.findOne({ where: { id, userId: userId } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    task.due_date = due_date ?? task.due_date;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating task" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Task.destroy({ where: { id, userId: req.user.id } });
    if (!deleted) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting task" });
  }
};
