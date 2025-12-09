// import { useRef, useState, Suspense } from "react";
// import useTasks from "../hooks/useTask";
// import TaskCard from "../components/TaskCard";
// import { jwtDecode } from "jwt-decode";

// export default function Dashboard() {
//   const { loading, err, tasks, createTask, updateTask, deleteTask, setFilters } =
//     useTasks();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [due, setDue] = useState("");
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("all");
//   const firstInvalidRef = useRef(null);

//   const onCreate = async (e) => {
//     e.preventDefault();
//     if (!title.trim()) {
//       firstInvalidRef.current?.focus();
//       return;
//     }

//     const token = localStorage.getItem("accessToken");
//     const user = jwtDecode(token);

//     await createTask({
//       title,
//       description,
//       due_date: due,
//       userId: user.id || null,
//     });

//     setTitle("");
//     setDescription("");
//     setDue("");
//   };

//   const toggleStatus = async (task) => {
//     const next =
//       task.status === "completed" ? "pending" : "completed";

//     const token = localStorage.getItem("accessToken");
//     const user = jwtDecode(token);

//     await updateTask(task.id, {
//       status: next,
//       userId: user.id || null,
//     });
//   };

//   const applyFilters = () => setFilters(search, status);

//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     location.href = "/";
//   };

//   return (
//     <div className="min-h-screen bg-slate-950 text-slate-100">
//       {/* Shell: sidebar + main content */}
//       <div className="flex min-h-screen">
//         {/* Sidebar */}
//         <aside className="hidden w-64 flex-col border-r border-white/10 bg-slate-950/90 px-4 py-6 md:flex">
//           {/* Brand */}
//           <div className="mb-8 flex items-center gap-2 px-2">
//             <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-lg">
//               ✓
//             </div>
//             <div>
//               <h1 className="text-base font-semibold tracking-tight">
//                 TaskFlow
//               </h1>
//               <p className="text-[11px] text-slate-400">
//                 Simple. Focused. Fast.
//               </p>
//             </div>
//           </div>

//           {/* Nav */}
//           <nav className="flex flex-1 flex-col gap-1 text-sm">
//             <p className="px-2 pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
//               Overview
//             </p>
//             <button className="flex items-center gap-2 rounded-xl bg-slate-800/80 px-3 py-2 text-sm font-medium text-slate-50 shadow-sm">
//               <span>📋</span>
//               <span>My tasks</span>
//             </button>
//             <button className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/70">
//               <span>⭐</span>
//               <span>Today</span>
//             </button>
//             <button className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/70">
//               <span>📆</span>
//               <span>Upcoming</span>
//             </button>

//             <div className="mt-6">
//               <p className="px-2 pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
//                 Status
//               </p>
//               <div className="space-y-1 px-1 text-xs text-slate-300">
//                 <div className="flex items-center justify-between rounded-lg px-2 py-1 hover:bg-slate-800/70">
//                   <span className="flex items-center gap-2">
//                     <span className="h-2 w-2 rounded-full bg-emerald-400" />
//                     Completed
//                   </span>
//                   <span className="rounded-full bg-slate-900 px-2 py-[2px] text-[10px]">
//                     {
//                       tasks.filter(
//                         (t) => t.status === "completed"
//                       ).length
//                     }
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between rounded-lg px-2 py-1 hover:bg-slate-800/70">
//                   <span className="flex items-center gap-2">
//                     <span className="h-2 w-2 rounded-full bg-cyan-400" />
//                     In progress
//                   </span>
//                   <span className="rounded-full bg-slate-900 px-2 py-[2px] text-[10px]">
//                     {
//                       tasks.filter(
//                         (t) => t.status === "in-progress"
//                       ).length
//                     }
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between rounded-lg px-2 py-1 hover:bg-slate-800/70">
//                   <span className="flex items-center gap-2">
//                     <span className="h-2 w-2 rounded-full bg-amber-400" />
//                     Pending
//                   </span>
//                   <span className="rounded-full bg-slate-900 px-2 py-[2px] text-[10px]">
//                     {
//                       tasks.filter(
//                         (t) => t.status === "pending"
//                       ).length
//                     }
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </nav>

//           {/* Footer / logout */}
//           <button
//             onClick={logout}
//             className="mt-6 flex items-center justify-center rounded-xl border border-white/15 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 active:scale-95"
//           >
//             Logout
//           </button>
//         </aside>

//         {/* Main */}
//         <div className="flex min-h-screen flex-1 flex-col">
//           {/* Top bar (for mobile + page title) */}
//           <header className="flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur md:px-8">
//             <div className="flex items-center gap-2 md:hidden">
//               <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-base">
//                 ✓
//               </div>
//               <div>
//                 <p className="text-sm font-semibold">TaskFlow</p>
//                 <p className="text-[11px] text-slate-400">
//                   Your tasks, organised.
//                 </p>
//               </div>
//             </div>

//             <div className="hidden md:block">
//               <h2 className="text-lg font-semibold tracking-tight">
//                 My tasks
//               </h2>
//               <p className="text-xs text-slate-400">
//                 Focus on what matters. We’ll track the rest.
//               </p>
//             </div>

//             <button
//               onClick={logout}
//               className="rounded-xl border border-white/15 bg-slate-900 px-4 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800 active:scale-95 md:hidden"
//             >
//               Logout
//             </button>
//           </header>

//           {/* Content area */}
//           <main className="flex-1 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
//             <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8">
//               {/* Left: create + filters */}
//               <section className="w-full space-y-4 lg:w-[360px]">
//                 {/* Create card */}
//                 <form
//                   onSubmit={onCreate}
//                   className="rounded-2xl border border-white/10 bg-slate-900/90 p-5 shadow-xl shadow-black/40"
//                 >
//                   <div className="mb-4 flex items-center justify-between gap-3">
//                     <div className="flex items-center gap-2">
//                       <span className="h-8 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400" />
//                       <div>
//                         <h3 className="text-sm font-semibold">
//                           Create new task
//                         </h3>
//                         <p className="text-[11px] text-slate-400">
//                           Give it a title, date and details.
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-3 text-sm">
//                     <div>
//                       <label className="mb-1 block text-xs font-medium text-slate-300">
//                         Title <span className="text-emerald-400">*</span>
//                       </label>
//                       <input
//                         ref={firstInvalidRef}
//                         className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs outline-none placeholder:text-slate-500 focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-500/40"
//                         placeholder="e.g. Prepare standup notes"
//                         value={title}
//                         onChange={(e) =>
//                           setTitle(e.target.value)
//                         }
//                       />
//                     </div>

//                     <div>
//                       <label className="mb-1 block text-xs font-medium text-slate-300">
//                         Description
//                       </label>
//                       <textarea
//                         className="min-h-[80px] w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs outline-none placeholder:text-slate-500 focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-500/40"
//                         placeholder="Add context, checklist, or notes (optional)"
//                         value={description}
//                         onChange={(e) =>
//                           setDescription(e.target.value)
//                         }
//                       />
//                     </div>

//                     <div className="flex items-end gap-3">
//                       <div className="flex-1">
//                         <label className="mb-1 block text-xs font-medium text-slate-300">
//                           Due date
//                         </label>
//                         <input
//                           type="date"
//                           className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs outline-none placeholder:text-slate-500 focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-500/40"
//                           value={due}
//                           onChange={(e) =>
//                             setDue(e.target.value)
//                           }
//                         />
//                       </div>
//                       <button
//                         type="submit"
//                         className="flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 px-4 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:brightness-110 active:scale-95"
//                       >
//                         + Add
//                       </button>
//                     </div>
//                   </div>
//                 </form>

//                 {/* Filters card */}
//                 <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl shadow-black/30">
//                   <div className="mb-3 flex items-center justify-between">
//                     <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
//                       Filters
//                     </h3>
//                   </div>

//                   <div className="space-y-3 text-xs">
//                     <div className="relative">
//                       <span className="pointer-events-none absolute left-3 top-2.5 text-sm text-slate-500">
//                         🔍
//                       </span>
//                       <input
//                         className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-8 py-2.5 text-xs outline-none placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-500/40"
//                         placeholder="Search by title…"
//                         value={search}
//                         onChange={(e) =>
//                           setSearch(e.target.value)
//                         }
//                       />
//                     </div>

//                     <div className="flex gap-2">
//                       <select
//                         className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs font-medium text-slate-200 outline-none focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-500/40"
//                         value={status}
//                         onChange={(e) =>
//                           setStatus(e.target.value)
//                         }
//                       >
//                         <option value="all">All tasks</option>
//                         <option value="pending">Pending</option>
//                         <option value="in-progress">
//                           In progress
//                         </option>
//                         <option value="completed">
//                           Completed
//                         </option>
//                       </select>
//                       <button
//                         onClick={applyFilters}
//                         className="flex items-center justify-center rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-slate-100 hover:bg-white/20 active:scale-95"
//                       >
//                         Apply
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </section>

//               {/* Right: task list */}
//               <section className="flex-1">
//                 {loading && (
//                   <div className="flex flex-col items-center justify-center py-12">
//                     <div className="inline-block h-9 w-9 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent" />
//                     <p className="mt-3 text-xs text-slate-400">
//                       Loading your tasks…
//                     </p>
//                   </div>
//                 )}

//                 {err && (
//                   <div className="mb-3 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-200">
//                     {err}
//                   </div>
//                 )}

//                 {!loading && tasks.length === 0 && !err && (
//                   <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700/70 bg-slate-950/80 px-6 py-14 text-center">
//                     <div className="mb-3 text-4xl">📋</div>
//                     <h3 className="text-sm font-semibold">
//                       You don’t have any tasks yet
//                     </h3>
//                     <p className="mt-1 text-xs text-slate-400">
//                       Create your first task from the panel on the
//                       left.
//                     </p>
//                   </div>
//                 )}

//                 <div className="mt-2 space-y-3">
//                   <Suspense
//                     fallback={
//                       <div className="flex justify-center py-8">
//                         <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
//                       </div>
//                     }
//                   >
//                     {tasks.map((t) => (
//                       <TaskCard
//                         key={t.id}
//                         task={t}
//                         onToggle={toggleStatus}
//                         onDelete={deleteTask}
//                       />
//                     ))}
//                   </Suspense>
//                 </div>
//               </section>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }
  



import { useRef, useState, Suspense,useEffect } from "react";
import TaskCard from "../components/TaskCard";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { fetchTask,createTask,updateTask,deleteTask } from "../store/taskSlice";
import useTasks from "../hooks/useTask"


export default function Dashboard() {
  const { setFilters } =  useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due, setDue] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const firstInvalidRef = useRef(null);
   const dispatch = useDispatch();
const { task: tasks, loading, error: err } = useSelector(
  (state) => state.task
);

  useEffect(() => {
    dispatch(fetchTask
      ());
  }, [dispatch]);

    const onCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      firstInvalidRef.current?.focus();
      return;
    }

    const token = localStorage.getItem("accessToken");
    const user = jwtDecode(token);

dispatch(createTask({
  title,description,due_date:due||null,  userId: user.id || null,
}))

    setTitle("");
    setDescription("");
    setDue("");
  };




  const toggleStatus = async (task) => {
    const next =
      task.status === "completed" ? "pending" : "completed";

    const token = localStorage.getItem("accessToken");
    const user = jwtDecode(token);

dispatch(updateTask({id:task.id,payload:{status:next,userId:user.id||null}}))

  };

  const applyFilters = () => setFilters(search, status);



  const logout = () => {
    localStorage.removeItem("accessToken");
    location.href = "/";
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Shell: sidebar + main content */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r border-white/10 bg-slate-950/90 px-4 py-6 md:flex">
          {/* Brand */}
          <div className="mb-8 flex items-center gap-2 px-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-lg">
              ✓
            </div>
            <div>
              <h1 className="text-base font-semibold tracking-tight">
                TaskFlow
              </h1>
              <p className="text-[11px] text-slate-400">
                Simple. Focused. Fast.
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-1 flex-col gap-1 text-sm">
            <p className="px-2 pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
              Overview
            </p>
            <button className="flex items-center gap-2 rounded-xl bg-slate-800/80 px-3 py-2 text-sm font-medium text-slate-50 shadow-sm">
              <span>📋</span>
              <span>My tasks</span>
            </button>
            <button className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/70">
              <span>⭐</span>
              <span>Today</span>
            </button>
            <button className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-300 hover:bg-slate-800/70">
              <span>📆</span>
              <span>Upcoming</span>
            </button>

            <div className="mt-6">
              <p className="px-2 pb-1 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                Status
              </p>
              <div className="space-y-1 px-1 text-xs text-slate-300">
                <div className="flex items-center justify-between rounded-lg px-2 py-1 hover:bg-slate-800/70">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Completed
                  </span>
                  <span className="rounded-full bg-slate-900 px-2 py-[2px] text-[10px]">
                    {
                      tasks.filter(
                        (t) => t.status === "completed"
                      ).length
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg px-2 py-1 hover:bg-slate-800/70">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    In progress
                  </span>
                  <span className="rounded-full bg-slate-900 px-2 py-[2px] text-[10px]">
                    {
                      tasks.filter(
                        (t) => t.status === "in-progress"
                      ).length
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg px-2 py-1 hover:bg-slate-800/70">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-400" />
                    Pending
                  </span>
                  <span className="rounded-full bg-slate-900 px-2 py-[2px] text-[10px]">
                    {
                      tasks.filter(
                        (t) => t.status === "pending"
                      ).length
                    }
                  </span>
                </div>
              </div>
            </div>
          </nav>

          {/* Footer / logout */}
          <button
            onClick={logout}
            className="mt-6 flex items-center justify-center rounded-xl border border-white/15 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 active:scale-95"
          >
            Logout
          </button>
        </aside>

        {/* Main */}
        <div className="flex min-h-screen flex-1 flex-col">
          {/* Top bar (for mobile + page title) */}
          <header className="flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 py-3 backdrop-blur md:px-8">
            <div className="flex items-center gap-2 md:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-base">
                ✓
              </div>
              <div>
                <p className="text-sm font-semibold">TaskFlow</p>
                <p className="text-[11px] text-slate-400">
                  Your tasks, organised.
                </p>
              </div>
            </div>

            <div className="hidden md:block">
              <h2 className="text-lg font-semibold tracking-tight">
                My tasks
              </h2>
              <p className="text-xs text-slate-400">
                Focus on what matters. We’ll track the rest.
              </p>
            </div>

            <button
              onClick={logout}
              className="rounded-xl border border-white/15 bg-slate-900 px-4 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800 active:scale-95 md:hidden"
            >
              Logout
            </button>
          </header>

          {/* Content area */}
          <main className="flex-1 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
            <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 lg:flex-row lg:px-8">
              {/* Left: create + filters */}
              <section className="w-full space-y-4 lg:w-[360px]">
                {/* Create card */}
                <form
                  onSubmit={onCreate}
                  className="rounded-2xl border border-white/10 bg-slate-900/90 p-5 shadow-xl shadow-black/40"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="h-8 w-1 rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400" />
                      <div>
                        <h3 className="text-sm font-semibold">
                          Create new task
                        </h3>
                        <p className="text-[11px] text-slate-400">
                          Give it a title, date and details.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-300">
                        Title <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        ref={firstInvalidRef}
                        className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs outline-none placeholder:text-slate-500 focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-500/40"
                        placeholder="e.g. Prepare standup notes"
                        value={title}
                        onChange={(e) =>
                          setTitle(e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-300">
                        Description
                      </label>
                      <textarea
                        className="min-h-[80px] w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs outline-none placeholder:text-slate-500 focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-500/40"
                        placeholder="Add context, checklist, or notes (optional)"
                        value={description}
                        onChange={(e) =>
                          setDescription(e.target.value)
                        }
                      />
                    </div>

                    <div className="flex items-end gap-3">
                      <div className="flex-1">
                        <label className="mb-1 block text-xs font-medium text-slate-300">
                          Due date
                        </label>
                        <input
                          type="date"
                          className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs outline-none placeholder:text-slate-500 focus:border-emerald-400/70 focus:ring-2 focus:ring-emerald-500/40"
                          value={due}
                          onChange={(e) =>
                            setDue(e.target.value)
                          }
                        />
                      </div>
                      <button
                        type="submit"
                        className="flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 px-4 py-2.5 text-xs font-semibold text-slate-950 shadow-lg shadow-emerald-500/40 hover:brightness-110 active:scale-95"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </form>

                {/* Filters card */}
                <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl shadow-black/30">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Filters
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-2.5 text-sm text-slate-500">
                        🔍
                      </span>
                      <input
                        className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-8 py-2.5 text-xs outline-none placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-500/40"
                        placeholder="Search by title…"
                        value={search}
                        onChange={(e) =>
                          setSearch(e.target.value)
                        }
                      />
                    </div>

                    <div className="flex gap-2">
                      <select
                        className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2.5 text-xs font-medium text-slate-200 outline-none focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-500/40"
                        value={status}
                        onChange={(e) =>
                          setStatus(e.target.value)
                        }
                      >
                        <option value="all">All tasks</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">
                          In progress
                        </option>
                        <option value="completed">
                          Completed
                        </option>
                      </select>
                      <button
                        onClick={applyFilters}
                        className="flex items-center justify-center rounded-xl bg-white/10 px-4 py-2.5 text-xs font-semibold text-slate-100 hover:bg-white/20 active:scale-95"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Right: task list */}
              <section className="flex-1">
                {loading && (
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="inline-block h-9 w-9 animate-spin rounded-full border-4 border-emerald-400 border-t-transparent" />
                    <p className="mt-3 text-xs text-slate-400">
                      Loading your tasks…
                    </p>
                  </div>
                )}

                {err && (
                  <div className="mb-3 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-200">
                    {err}
                  </div>
                )}

                {!loading && tasks.length === 0 && !err && (
                  <div className="mt-4 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700/70 bg-slate-950/80 px-6 py-14 text-center">
                    <div className="mb-3 text-4xl">📋</div>
                    <h3 className="text-sm font-semibold">
                      You don’t have any tasks yet
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Create your first task from the panel on the
                      left.
                    </p>
                  </div>
                )}

                <div className="mt-2 space-y-3">
                  <Suspense
                    fallback={
                      <div className="flex justify-center py-8">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
                      </div>
                    }
                  >
                    {tasks.map((t) => (
                      <TaskCard
                        key={t.id}
                        task={t}
                        onToggle={toggleStatus}
                        onDelete={deleteTask}
                      />
                    ))}
                  </Suspense>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
  