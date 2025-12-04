

import { useRef, useState, Suspense } from "react";
import useTasks from "../hooks/useTask";
import TaskCard from "../components/TaskCard";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const { loading, err, tasks, createTask, updateTask, deleteTask, setFilters } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due, setDue] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const firstInvalidRef = useRef(null);

  const onCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      firstInvalidRef.current?.focus();
      return;
    }
    const token = localStorage.getItem("accessToken");
const user = jwtDecode(token);
console.log(user.id, user.email);

    await createTask({ title, description, due_date: due, userId: user.id   || null });
    setTitle(""); setDescription(""); setDue("");
  };
  

  const toggleStatus = async (task) => {
    console.log("Toggling status for task:", task);
    const next = task.status === "completed" ? "pending" : "completed";
    const token = localStorage.getItem("accessToken");
const user = jwtDecode(token);
    await updateTask(task.id,{ status: next, userId: user.id || null });
  };

  const applyFilters = () => setFilters(search, status);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="px-6 py-4 bg-white shadow flex items-center justify-between">
        <h1 className="text-xl font-bold">TaskFlow Dashboard</h1>
        <button
          onClick={() => { localStorage.removeItem("accessToken"); location.href="/"; }}
          className="px-3 py-2 bg-gray-900 text-white rounded-lg"
        >
          Logout
        </button>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Create */}
        <form onSubmit={onCreate} className="bg-white p-4 rounded-xl shadow space-y-3">
          <h2 className="font-semibold">Create Task</h2>
          <input
            ref={firstInvalidRef}
            className="border rounded w-full p-2"
            placeholder="Title *"
            value={title} onChange={(e)=>setTitle(e.target.value)}
          />
          <textarea
            className="border rounded w-full p-2"
            placeholder="Description"
            value={description} onChange={(e)=>setDescription(e.target.value)}
          />
          <div className="flex gap-3">
            <input
              type="date"
              className="border rounded p-2"
              value={due} onChange={(e)=>setDue(e.target.value)}
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
          </div>
        </form>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow flex flex-col md:flex-row gap-3 md:items-center">
          <input
            className="border rounded p-2 flex-1"
            placeholder="Search title…"
            value={search} onChange={(e)=>setSearch(e.target.value)}
          />
          <select
            className="border rounded p-2"
            value={status} onChange={(e)=>setStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={applyFilters} className="px-4 py-2 bg-gray-800 text-white rounded">
            Apply
          </button>
        </div>

        {/* List */}
        {loading && <p>Loading…</p>}
        {err && <p className="text-red-600">{err}</p>}
        {!loading && tasks.length === 0 && <p>No tasks found.</p>}

        <div className="grid gap-3">
          <Suspense fallback={<p>Loading tasks…</p>}>
            {tasks.map((t) => (
              <TaskCard key={t.id} task={t} onToggle={toggleStatus} onDelete={deleteTask} />
            ))}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
