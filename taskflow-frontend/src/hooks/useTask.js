import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { taskApi } from "../api/https";

export default function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const latestQueryRef = useRef({ search: "", status: "all" });

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const res = await taskApi.get("/getTask");
      setTasks(res.data || []);
    } catch (e) {
      setErr("Failed to load tasks",e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  const createTask = useCallback(async (payload) => {
    const res = await taskApi.post("/createTask", payload);
    setTasks((prev) => [res.data, ...prev]);
  }, []);

  const updateTask = useCallback(async (id, payload) => {
    console.log("Updating task id:", id, "with payload:", payload);
    const res = await taskApi.put(`/updateTasks/${id}`, payload);
    setTasks((prev) => prev.map(t => (t.id === id ? res.data : t)));
  }, []);

  const deleteTask = useCallback(async (id) => {
    await taskApi.delete(`/deleteTasks/${id}`);
    setTasks((prev) => prev.filter(t => t.id !== id));
  }, []);

  const setFilters = useCallback((search, status) => {
    latestQueryRef.current = { search, status };
  }, []);

  // derive visible tasks (memoized)
  const visibleTasks = useMemo(() => {
    const { search, status } = latestQueryRef.current;
    return tasks.filter(t => {
      const matchesText = t.title.toLowerCase().includes((search||"").toLowerCase());
      const matchesStatus = status === "all" ? true : t.status === status;
      return matchesText && matchesStatus;
    });
  }, [tasks]);

  return {
    loading, err,
    tasks: visibleTasks,
    rawTasks: tasks, // sometimes handy
    fetchTasks, createTask, updateTask, deleteTask,
    setFilters,
  };
}
