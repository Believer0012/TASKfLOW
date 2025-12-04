    /* eslint-disable no-unused-vars */
import {memo}  from 'react';


function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className="p-4 rounded-xl shadow bg-white flex items-start justify-between">
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
        <p className="text-xs mt-1">
          Status: <span className="font-medium">{task.status}</span>
        </p>
        {task.due_date && (
          <p className="text-xs text-gray-500">Due: {new Date(task.due_date).toLocaleDateString()}</p>
        )}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onToggle(task)}
          className="px-3 py-1 rounded bg-blue-600 text-white text-sm"
        >
          {task.status === "completed" ? "Mark Pending" : "Mark Done"}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 rounded bg-red-600 text-white text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default memo(TaskCard);
