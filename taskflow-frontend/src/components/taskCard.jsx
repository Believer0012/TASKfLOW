/* eslint-disable no-unused-vars */
import { memo } from "react";

function TaskCard({ task, onToggle, onDelete }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-300 border-emerald-500/40";
      case "in-progress":
        return "bg-cyan-500/10 text-cyan-300 border-cyan-500/40";
      case "pending":
        return "bg-amber-500/10 text-amber-300 border-amber-500/40";
      default:
        return "bg-slate-700/40 text-slate-200 border-slate-500/40";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return "✓";
      case "in-progress":
        return "⟳";
      case "pending":
        return "○";
      default:
        return "•";
    }
  };

  const isOverdue =
    task.due_date &&
    new Date(task.due_date) < new Date() &&
    task.status !== "completed";

  const isDueToday =
    task.due_date &&
    new Date(task.due_date).toDateString() === new Date().toDateString();

  return (
    <div
      className={`group rounded-2xl border bg-slate-950/60 p-4 text-sm text-slate-100 shadow-lg shadow-black/40 transition-all duration-300 hover:border-emerald-400/40 hover:bg-slate-950/90 hover:shadow-xl ${
        task.status === "completed"
          ? "border-emerald-500/50"
          : task.status === "in-progress"
          ? "border-cyan-500/40"
          : isOverdue
          ? "border-red-500/50"
          : "border-slate-700/70"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left content */}
        <div className="flex-1 space-y-2">
          {/* Title */}
          <div className="flex items-center gap-2">
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-xl border text-xs ${
                task.status === "completed"
                  ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-300"
                  : "border-slate-600 bg-slate-900 text-slate-200"
              }`}
            >
              {getStatusIcon(task.status)}
            </span>
            <h3
              className={`text-sm font-semibold tracking-tight ${
                task.status === "completed"
                  ? "line-through text-slate-500"
                  : "text-slate-50"
              }`}
            >
              {task.title}
            </h3>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-xs leading-relaxed text-slate-300">
              {task.description}
            </p>
          )}

          {/* Status + Due date */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {/* Status badge */}
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-medium ${getStatusColor(
                task.status
              )}`}
            >
              <span className="text-xs leading-none">
                {getStatusIcon(task.status)}
              </span>
              {task.status.charAt(0).toUpperCase() +
                task.status.slice(1).replace("-", " ")}
            </span>

            {/* Due date badge */}
            {task.due_date && (
              <span
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-medium ${
                  isOverdue
                    ? "border-red-500/50 bg-red-500/10 text-red-300"
                    : isDueToday
                    ? "border-amber-500/50 bg-amber-500/10 text-amber-300"
                    : "border-slate-600 bg-slate-900 text-slate-300"
                }`}
              >
                <span className="text-sm">📅</span>
                {isOverdue ? "Overdue: " : isDueToday ? "Due today: " : "Due: "}
                {new Date(task.due_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year:
                    new Date(task.due_date).getFullYear() !==
                    new Date().getFullYear()
                      ? "numeric"
                      : undefined,
                })}
              </span>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onToggle(task)}
            className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-semibold shadow-md transition-all hover:shadow-lg active:scale-95 ${
              task.status === "completed"
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-110"
                : "bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 hover:brightness-110"
            }`}
          >
            {task.status === "completed" ? "Reopen" : "Mark complete"}
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="rounded-xl bg-gradient-to-r from-red-500 to-rose-500 px-4 py-2 text-xs font-semibold text-slate-50 shadow-md transition-all hover:brightness-110 hover:shadow-lg active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(TaskCard);
