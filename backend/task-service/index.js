import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRouter from "./routes/taskServiceRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRouter);

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("✅ Task Service API running...");
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
export default app;